const fetch = require('node-fetch');
const Progress = require('cli-progress');
const urls = require('./xivapi/urls');

module.exports = class APICrawler {
  constructor(config = {}, apiKey = '') {
    if (!config || typeof config !== 'object') {
      throw new Error('Config passed to APICrawler as first argument must be an object.');
    }

    if (config.method === 'fetch' && (!config.name || typeof config.name !== 'string')) {
      throw new Error(
        'Config object passed to APICrawler must specify a name string if method is fetch.'
      );
    }

    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('API key passed to APICrawler as second argument must be a string.');
    }

    this.apiKey = apiKey;
    this.config = config;
    this.errors = 0;
  }

  /**
   * Fetch data from the API and return it to the callee.
   * This function is recursive if the passed-in config's `isPaginated` flag is enabled.
   * @param {Array} [resultIn] - An optional results array.
   * @param {Number} [pageIn] - An optional page offset. 
   * @param {Progress} [progressBarIn] - A progress bar reference if the result set is paginated.
   */
  async fetch(resultIn = [], pageIn = 1, progressBarIn = undefined) {
    const {
      columns,
      filter,
      isPaginated,
      limit,
      name
    } = this.config;

    const log = this.config.log || name;

    if (pageIn === 1) {
      console.time(log);
      console.info(`Starting ${isPaginated ? '' : 'un'}paginated fetch of ${log}.`);
    }

    const apiPath = urls[`${name.charAt(0).toLowerCase()}${name.substr(1)}`]();

    const queryStringParts = [
      `apiKey=${this.apiKey}`,
      `limit=${limit || 3000}`
    ];

    if (Array.isArray(columns) && columns.length) {
      queryStringParts.push(`columns=${columns.join(',')}`);
    }

    if (isPaginated) {
      queryStringParts.push(`page=${pageIn}`);
    }

    const apiUrl = `${apiPath}?${queryStringParts.join('&')}`;

    const handleFetchError = (error) => {
      console.warn(error);
    
      if (this.errors > 10) {
        throw new Error(`XIVDB API error: ${error}.`);
      }

      ++this.errors;
      console.info(`API retry attempt ${this.errors}.`);
      return this.fetch(resultIn, pageIn, progressBarIn);
    }

    const data = await fetch(apiUrl, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .catch(e => handleFetchError);

    if (data.Error) {
      return handleFetchError(data.Message);
    } else {
      this.errors = 0;
    }

    // If the resource is not paginated, return the data.
    if (!isPaginated || !data.Pagination) {
      console.info(`Finished unpaginated fetch of ${log}.`);
      console.timeEnd(log);
      return data;
    }

    const {
      PageNext,
      ResultsPerPage,
      ResultsTotal
    } = data.Pagination;

    let progressBar = progressBarIn;
    const processedRecordsCount = (
      ResultsPerPage * pageIn > ResultsTotal
        ? ResultsTotal
        : ResultsPerPage * pageIn
    );

    if (PageNext === 2) {
      progressBar = new Progress.Bar({}, Progress.Presets.shades_grey);
      progressBar.start(ResultsTotal, processedRecordsCount);
    } else {
      progressBar.update(processedRecordsCount);
    }

    let entries = data.Results;

    // Filter the data if a filter callback was provided.
    if (typeof filter === 'function') {
      entries = filter(entries);
    }

    // Extend the result array with the new data.
    const result = [
      ...resultIn,
      ...entries
    ];

    // If we're not at the final page, continue fetching.
    if (PageNext && PageNext !== 1) {
      return this.fetch(result, PageNext, progressBar);
    }

    const totalCount = result.length;

    progressBar.stop();

    console.info(`Finished paginated fetch of ${log}; ${totalCount} ${(
      totalCount === 1 ? 'entry' : 'entries'
    )} found.`);
    console.timeEnd(log);

    // If we're at the final page, return the result.
    return result;
  }

  /**
   * Perform an Elastic Search on the API.
   * This function is recursive.
   * @param {Array} [result] - An optional results array.
   * @param {Number} [page] - An optional page offset. 
   */
  async search(result = [], page = 1) {
    const {
      columns,
      indexes,
      log,
      query,
      queryType
    } = this.config;

    if (page === 1 && log) {
      console.time(log);
      console.info(`Starting search for ${log}.`);
    }

    const apiPath = urls.search();

    const queryStringParts = [
      `apiKey=${this.apiKey}`,
      `page=${page}`
    ];

    const apiUrl = `${apiPath}?${queryStringParts.join('&')}`;
    const size = 100;

    const data = await fetch(apiUrl, {
      body: JSON.stringify({
        body: {
          from: (page * size) - 100,
          query: {
            bool: {
              [queryType || 'should']: query
            }
          },
          size
        },
        columns,
        indexes
      }),
      method: 'POST',
      mode: 'cors'
    })
      .then(response => response.json())
      .catch(e => {
        console.warn(e);

        if (this.errors > 10)
          throw new Error(`XIVDB API error: ${e}.`);

        ++this.errors;
        console.info(`API retry attempt ${this.errors}.`);
        callApi(apiPath, columns, callback, tag);
      });

    // Extend the result array with the new data.
    result = [
      ...result,
      ...data.Results
    ];

    // If we're not at the final page, continue fetching.
    if (data.Pagination.Page !== data.Pagination.PageTotal) {
      return this.search(result, data.Pagination.PageNext);
    }

    if (log) {
      console.info(`Finished search for ${log}; ${data.Pagination.ResultsTotal} result(s) found.`);
      console.timeEnd(log);
    }

    // If we're at the final page, return the result.
    return result;
  }
}