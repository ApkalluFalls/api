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

    this.apiCallCount = 0;
    this.apiKey = apiKey;
    this.config = config;
    this.cumulativeSuccessfulCalls = 0;
    this.errors = 0;
    this.recordsProcessed = 0;
  }

  /**
   * Fetch data from the API and return it to the callee.
   * This function is recursive if the passed-in config's `isPaginated` flag is enabled.
   * @param {Array} [resultIn] - An optional results array.
   * @param {Number} [pageIn] - An optional page offset. 
   * @param {Progress} [progressBarIn] - A progress bar reference if the result set is paginated.
   */
  async fetch(resultIn = [], pageIn = 1, progressBarIn = undefined, limitValueOffset = 0) {
    const {
      columns,
      filter,
      isPaginated,
      name
    } = this.config;

    // Used to handle API timeouts gracefully.
    const limitValues = [
      3000,
      1500,
      300,
      150,
      30,
      15,
      3,
      1
    ];

    const log = this.config.log || name;
    const limit = limitValues[limitValueOffset];
    const page = (this.recordsProcessed / limit) + 1;

    if (page === 1 && limitValueOffset === 0) {
      console.time(log);
      console.info(`Starting ${isPaginated ? '' : 'un'}paginated fetch of ${log}.`);
    }

    const apiPath = urls[`${name.charAt(0).toLowerCase()}${name.substr(1)}`]();

    const queryStringParts = [
      `apiKey=${this.apiKey}`,
      `limit=${limit}`
    ];

    if (Array.isArray(columns) && columns.length) {
      queryStringParts.push(`columns=${columns.join(',')}`);
    }

    if (isPaginated) {
      queryStringParts.push(`page=${page}`);
    }

    const apiUrl = `${apiPath}?${queryStringParts.join('&')}`;

    const handleFetchError = async (error) => {
      this.cumulativeSuccessfulCalls = 0;
      if (progressBarIn) {
        progressBarIn.stop();
      }

      if (/^Error\: Maximum execution time/.test(error) && limit > 1) {
        const newLimit = limitValues[limitValueOffset + 1];
        console.warn(`API timed out. Temporarily reducing limit from ${limit} to ${newLimit}.`);
        return await this.fetch(resultIn, (this.recordsProcessed / newLimit) + 1, undefined, limitValueOffset + 1);
      }

      console.warn(error);

      if (this.errors > 10) {
        throw new Error(`XIVDB API error: ${error}.`);
      }

      ++this.errors;
      console.info(`API retry attempt ${this.errors}.`);
      return await this.fetch(resultIn, pageIn, undefined, limitValueOffset);
    }

    this.apiCallCount++;

    const data = await fetch(apiUrl, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .catch(async e => await handleFetchError());

    if (data.Error) {
      return await handleFetchError(data.Message);
    } else {
      this.cumulativeSuccessfulCalls++;
      this.errors = 0;
      this.recordsProcessed += limit;
    }

    // If the resource is not paginated, return the data.
    if (!isPaginated || !data.Pagination) {
      console.info(`Finished unpaginated fetch of ${log}.`);
      console.timeEnd(log);
      return data;
    }

    const {
      PageNext,
      ResultsTotal
    } = data.Pagination;

    let progressBar = progressBarIn;

    const processedRecordsCount = (
      (page * limit) > ResultsTotal
        ? ResultsTotal
        : page * limit
    );

    if (!progressBar) {
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
      if (limitValueOffset > 0 && this.cumulativeSuccessfulCalls > 5) {
        const previousLimitValue = limitValues[limitValueOffset - 1];

        if (this.recordsProcessed % previousLimitValue === 0) {
          this.cumulativeSuccessfulCalls = 0;
          progressBar.stop();
          console.warn(
            `Attempting to increase limit from ${limit} to ${previousLimitValue}...`
          );
          return await this.fetch(result, (this.recordsProcessed / previousLimitValue) + 1, undefined, limitValueOffset - 1);
        }
      }

      return await this.fetch(result, PageNext, progressBar, limitValueOffset);
    }

    const totalCount = result.length;

    progressBar.stop();

    console.info(`Finished paginated fetch of ${log}; ${totalCount} ${(
      totalCount === 1 ? 'entry' : 'entries'
    )} found after ${this.apiCallCount} API ${(
      this.apiCallCount === 1 ? 'call' : 'calls'
    )}.`);
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