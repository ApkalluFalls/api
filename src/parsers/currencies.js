const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse item data from XIVAPI.
 */
module.exports = async (data) => {
  const config = require('../config/data').currencies;

  const parsed = data.map(entry => ({
    icon: entry.IconID,
    iconPath: entry.Icon,
    id: entry.ID,
    name: helper.getLocalisedNamesObject(entry),
    plural: helper.getLocalisedNamesObject(entry, 'Plural')
  }));

  fs.writeFileSync(
    '../data/currencies.json',
    JSON.stringify(parsed),
    'utf8',
    () => console.info(`${config.log} data parsed.`)
  );
};