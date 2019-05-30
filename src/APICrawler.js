const fetch = require('node-fetch');
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
   * @param {Array} [result] - An optional results array.
   * @param {Number} [page] - An optional page offset. 
   */
  async fetch(result = [], page = 1) {
    const {
      columns,
      isPaginated,
      name
    } = this.config;

    const log = this.config.log || name;

    if (page === 1) {
      console.time(log);
      console.info(`Starting ${isPaginated ? '' : 'un'}paginated fetch of ${log}.`);
    }

    const apiPath = urls[`${name.charAt(0).toLowerCase()}${name.substr(1)}`]();

    const queryStringParts = [
      `apiKey=${this.apiKey}`,
      'limit=3000'
    ];

    if (Array.isArray(columns) && columns.length) {
      queryStringParts.push(`columns=${columns.join(',')}`);
    }

    if (isPaginated) {
      queryStringParts.push(`page=${page}`);
    }

    const apiUrl = `${apiPath}?${queryStringParts.join('&')}`;

    const data = await fetch(apiUrl, {
      method: 'GET',
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

    // If the resource is not paginated, return the data.
    if (!isPaginated || !data.Pagination) {
      console.info(`Finished unpaginated fetch of ${log}.`);
      console.timeEnd(log);
      return data;
    }

    // Extend the result array with the new data.
    result = [
      ...result,
      ...data.Results
    ];

    // If we're not at the final page, continue fetching.
    if (data.Pagination.Page !== data.Pagination.PageTotal) {
      return this.fetch(result, data.Pagination.PageNext);
    }

    const totalCount = data.Pagination.ResultsTotal;

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
      query
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
              should: query
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