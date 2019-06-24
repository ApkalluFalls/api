const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse retainer venture data from XIVAPI.
 * @param {Array} data - Retainer venture data from the API.
 * @param {Array} tasks - Retainer venture tasks from the API.
 */
module.exports = (data, tasks) => {
  const config = require('../config/data').retainerVentures;

  const parsed = data.map(entry => {
    const task = tasks.find(task => task.ID === entry.Task);

    return {
      id: task.ID,
      level: entry.RetainerLevel,
      name: helper.getLocalisedNamesObject(task)
    }
  });

  fs.writeFileSync(
    './data/retainerVentures.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};