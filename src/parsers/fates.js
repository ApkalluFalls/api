const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse FATE data from XIVAPI.
 * @param {Array} data - FATE data from the API.
 */
module.exports = (data) => {
  const config = require('../config/data').currencies;

  const parsed = data.map(entry => ({
    id: entry.ID,
    level: entry.ClassJobLevel,
    name: helper.getLocalisedNamesObject(entry)
  }));

  fs.writeFileSync(
    './data/fates.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};