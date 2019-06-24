const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse treasure hunt (timeworn maps) data from XIVAPI.
 * @param {Array} data - Treasure hunt data from the API.
 */
module.exports = (data) => {
  const config = require('../config/data').treasureHunt;

  const parsed = data.map(entry => ({
    id: entry.ID,
    name: helper.getLocalisedNamesObject(entry.ItemName),
    maxPartySize: entry.MaxPartySize
  }));

  fs.writeFileSync(
    './data/treasureHunt.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};