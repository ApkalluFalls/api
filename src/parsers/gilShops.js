const helper = require('../xivapi/helper');
const fs = require('fs');
const items = require('../../data/items.json');

/**
 * Parse gil shop data from XIVAPI.
 * @param {Array} data - Special shop data from the API.
 */
module.exports = (data,) => {
  const config = require('../config/data').shops.gilShops;
  const itemConfig = require('../config/data').items;

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  const parsed = data.map(entry => {
    const response = {
      ID: entry.ID,
      Items: entry.Items.filter(shopItem => {
        return allItems.find(item => item.id === shopItem.ID);
      }).map(shopItem => {
        const response = {};

        for (const column of itemConfig.columns) {
          response[column] = shopItem[column];
        }

        return response;
      }),
      Name_de: entry.Name_de,
      Name_en: entry.Name_en,
      Name_fr: entry.Name_fr,
      Name_ja: entry.Name_ja
    };

    return response;
  }).filter(entry => entry.Items.length);

  fs.writeFileSync(
    './data/gilShops.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};