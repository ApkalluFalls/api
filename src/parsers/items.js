const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse item data from XIVAPI.
 */
module.exports = (data) => {
  const config = require('../config/data').items;
  const parsed = {};

  data.forEach(entry => {
    const {
      id,
      type
    } = helper.getContentFromItemActions(entry.ItemAction);

    if (!parsed[type]) {
      parsed[type] = [];
    }

    const response = {
      icon: entry.IconID,
      iconPath: entry.Icon,
      id: entry.ID,
      isUntradable: entry.IsUntradable,
      name: helper.getLocalisedNamesObject(entry),
      plural: helper.getLocalisedNamesObject(entry, 'Plural')
    }

    if (type !== 'misc') {
      response.contentId = id;
      response.contentType = type;
      response.description = {
        ...helper.getLocalisedNamesObject(entry, 'Description')
      };
    }

    parsed[type].push(response);
  });

  fs.writeFileSync(
    './data/items.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};