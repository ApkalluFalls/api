const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse instance data from XIVAPI.
 * @param {Array} data - Currency data from the API.
 */
module.exports = (data) => {
  const config = require('../config/data').instances;

  const parsed = data.filter(entry => entry.ContentFinderCondition).map(entry => ({
    id: entry.ID,
    level: entry.ContentFinderCondition.ClassJobLevelRequired,
    name: helper.getLocalisedNamesObject(entry),
    type: helper.getLocalisedNamesObject(entry.ContentType)
  }));

  fs.writeFileSync(
    './data/instances.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};