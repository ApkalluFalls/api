const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse patchlist data from XIVAPI.
 * @param {Array} data - Patchlist data from the API.
 */
module.exports = (data) => {
  const config = require('../config/data').patches;

  const parsed = data.map(entry => {
    const response = {
      date: Number(`${entry.ReleaseDate}000`),
      id: entry.ID,
      name: helper.getLocalisedNamesObject(entry),
      version: entry.Version
    }

    if (entry.Banner) {
      response.banner = entry.Banner;
    }

    if (entry.IsExpansion) {
      response.isExpansion = true;
    }

    return response;
  });

  fs.writeFileSync(
    './data/patches.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};