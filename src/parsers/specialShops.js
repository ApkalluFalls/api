const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse special shop data from XIVAPI.
 * @param {Array} data - Special shop data from the API.
 */
module.exports = (data,) => {
  const config = require('../config/data').shops.specialShops;

  const {
    columns: currencyConfigColumns
  } = require('../config/data').currencies;

  const parsed = data.map(entry => {
    const response = {
      id: entry.ID,
      name: helper.getLocalisedNamesObject(entry)
    };

    for (const specialShopItemIndex of config.specialShopItemIndexes) {
      const targetItem = entry[`ItemCost${specialShopItemIndex}TargetID`];

      // If there's no item for this index, do not bother saving it.
      if (!targetItem) {
        continue;
      }

      response[`CountCost${specialShopItemIndex}`] = entry[`CountCost${specialShopItemIndex}`];
      response[`ItemCost${specialShopItemIndex}TargetID`] = targetItem;

      // Ensure we have all the columns from the currencies config extracted for the item.
      const rawItem = {};
      currencyConfigColumns.forEach(key => (
        rawItem[key] = entry[`ItemCost${specialShopItemIndex}`][key]
      ));
    
      response[`ItemCost${specialShopItemIndex}`] = rawItem;
    }

    return response;
  });

  fs.writeFileSync(
    './data/specialShops.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};