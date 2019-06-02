const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse item data from XIVAPI.
 * @param {Array} data - Currency data from the API.
 * @param {Boolean} [isExternalParse] - Whether the parser should return the data instead of creating a file.
 */
module.exports = (data, isExternalParse) => {
  const config = require('../config/data').currencies;

  const parsed = data.map(entry => ({
    icon: entry.IconID,
    iconPath: entry.Icon,
    id: entry.ID,
    name: helper.getLocalisedNamesObject(entry),
    plural: helper.getLocalisedNamesObject(entry, 'Plural')
  }));

  if (isExternalParse) {
    return parsed;
  }

  fs.writeFileSync(
    '../data/currencies.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};