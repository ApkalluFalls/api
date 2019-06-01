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

    parsed[type].push({
      contentId: id,
      contentType: type,
      description: {
        ...helper.getLocalisedNamesObject(entry, 'Description')
      },
      icon: entry.IconID,
      iconPath: entry.Icon,
      id: entry.ID,
      isUntradable: entry.IsUntradable,
      name: helper.getLocalisedNamesObject(entry),
      plural: helper.getLocalisedNamesObject(entry, 'Plural')
    })
  });

  fs.writeFileSync(
    '../data/items.json',
    JSON.stringify(parsed),
    'utf8',
    () => console.info(`${config.log} data parsed.`)
  );
};