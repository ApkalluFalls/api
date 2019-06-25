const fs = require('fs');
const helper = require('../xivapi/helper');

/**
 * Parse BNPC data from XIVAPI.
 * @param {Array} data - BNPC data from the API.
 */
module.exports = (data) => {
  const config = require('../config/data').shops.bNPCNames;

  const parsed = data.map(entry => {
    return {
      id: entry.ID,
      name: helper.getLocalisedNamesObject(entry)
    }
  });

  fs.writeFileSync(
    './data/bnpcs.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};