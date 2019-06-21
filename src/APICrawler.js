const fetch = require('node-fetch');
const fs = require('fs');
const Progress = require('cli-progress');
const urls = require('./xivapi/urls');

module.exports = class APICrawler {
  constructor(config = {}) {
    if (!config || typeof config !== 'object') {
      throw new Error('Config passed to APICrawler as first argument must be an object.');
    }

    if (config.method === 'fetch' && (!config.name || typeof config.name !== 'string')) {
      throw new Error(
        'Config object passed to APICrawler must specify a name string if method is fetch.'
      );
    }

    this.apiCallCount = 0;
    this.config = config;
    this.cumulativeSuccessfulCalls = 0;
    this.errors = 0;
    this.recordsProcessed = 0;
  }

  /**
   * Fetch data from the API and return it to the callee.
   * This function is recursive if the passed-in config's `isPaginated` flag is enabled.
   * @param {Array} [resultIn] - An optional results array.
   * @param {Number} [pageIn] - An optional page offset. If this is -1, we're checking cache.
   * @param {Progress} [progressBarIn] - A progress bar reference if the result set is paginated.
   */
  async fetch(resultIn = [], pageIn = 1, progressBarIn = undefined, limitValueOffset = 0) {
    const {
      args,
      isPaginated,
      name
    } = this.config;

    const log = this.config.log || name;

    // If the result set is already cached, return that instead of calling the API.
    if (isPaginated && pageIn === 1) {
      const cachedData = await this.getCachedData();

      if (cachedData) {
        console.info(`Using cached data for ${log}.`);
        return cachedData;
      }
    }

    const {
      columns,
      filter,
      silent
    } = this.config;

    // Used to handle API timeouts gracefully.
    const limitValues = [
      1500,
      300,
      150,
      30,
      15,
      3,
      1
    ];

    const limit = pageIn === -1 ? 1 : limitValues[limitValueOffset];
    const page = pageIn === -1 ? 1 : (this.recordsProcessed / limit) + 1;

    if (pageIn !== -1 && page === 1 && limitValueOffset === 0 && !silent) {
      console.time(log);
      console.info(`Starting ${isPaginated ? '' : 'un'}paginated fetch of ${log}.`);
    }

    const apiPath = urls[`${name.charAt(0).toLowerCase()}${name.substr(1)}`](...(args || []));

    const queryStringParts = [
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
      if (!silent) {
        console.info(`Finished unpaginated fetch of ${log}.`);
        console.timeEnd(log);
      }

      return data;
    }

    // If this is a cache check, only return the total records count.
    if (pageIn === -1) {
      return data.Pagination.ResultsTotal;
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
    cacheData(result, ResultsTotal, this.config);

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
      log
    } = this.config;

    // If the result set is already cached, return that instead of calling the API.
    if (page === 1) {
      const cachedData = await this.getCachedData();
      if (cachedData) {
        console.info(`Using cached data for ${log}.`);
        return cachedData;
      }
    }

    const {
      columns,
      indexes,
      query,
      queryType
    } = this.config;

    if (page === 1 && log) {
      console.time(log);
      console.info(`Starting search for ${log}.`);
    }

    const apiPath = urls.search();

    const queryStringParts = [
      `page=${page === -1 ? 1 : page}`
    ];

    const apiUrl = `${apiPath}?${queryStringParts.join('&')}`;
    const size = page === -1 ? 1 : 100;

    const data = await fetch(apiUrl, {
      body: JSON.stringify({
        body: {
          from: page === -1 ? 0 : (page * size) - 100,
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

    if (page === -1) {
      return data.Pagination.ResultsTotal;
    }

    // Extend the result array with the new data.
    result = [
      ...result,
      ...data.Results
    ];

    // If we're not at the final page, continue fetching.
    if (data.Pagination.Page !== data.Pagination.PageTotal) {
      return this.search(result, data.Pagination.PageNext);
    }

    const {
      ResultsTotal
    } = data.Pagination;

    if (log) {
      console.info(`Finished search for ${log}; ${ResultsTotal} result(s) found.`);
      console.timeEnd(log);
    }

    cacheData(result, ResultsTotal, this.config);

    // If we're at the final page, return the result.
    return result;
  }

  /**
   * Get cached data for a given data set. This returns cached data only if the cached data is the
   * most recent. It does this by first checking if the file exists, then if so, calling the api with
   * a limit of 0 to compare the results count with the cached data.
   */
  async getCachedData() {
    const path = getCachedFilePathFromConfig(this.config);
  
    const cacheFileExists = await new Promise(resolve => {
      fs.exists(path, (exists) => {
        resolve(exists);
      });
    });
  
    if (!cacheFileExists) {
      return false;
    }
  
    const cachedDataString = await new Promise((resolve, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) {
          console.error(`Failed to read cached file ${file} due to error: ${error}.`);
          reject();
          return;
        }
  
        resolve(data);
      });
    });
  
    if (!cachedDataString || !cachedDataString.length) {
      return false;
    }

    try {
      let cachedData = JSON.parse(cachedDataString);
      const totalResultsFromAPI = await this[this.config.method](undefined, -1);

      if (totalResultsFromAPI !== cachedData.totalResults) {
        return false;
      }

      return cachedData.data;
    } catch (exception) {
      console.error(`Unable to read cached data from ${this.config.log || this.config.name} because of error: ${exception}.`);
      return false;
    }
  }
}

/**
 * Get the cached data file path from a given data config.
 * @param {Object} config - The config object for a data set.
 */
function getCachedFilePathFromConfig(config) {
  const name = (config.cacheAs || config.name || config.log);
  return `./data/cached/${name.charAt(0).toLowerCase()}${name.substr(1)}.json`;
}

/**
 * Cache data locally so we don't bombard the API with repeated calls.
 * @param {Object} data - Data returned from the API.
 * @param {Number} totalResults - The total number of results.
 * @param {Object} config - The config object for the data set.
 */
function cacheData(data, totalResults, config) {
  fs.writeFile(
    getCachedFilePathFromConfig(config),
    JSON.stringify({
      data,
      totalResults
    }),
    'utf8',
    () => {
      // This is an async operation but we do it in the background.
    }
  );
}