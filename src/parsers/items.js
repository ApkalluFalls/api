const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse item data from XIVAPI.
 */
module.exports = async (data) => {
  const config = require('../config/methods').items;
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
      iconId: entry.IconID,
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