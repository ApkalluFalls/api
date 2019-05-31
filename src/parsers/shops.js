const fs = require('fs');
const currencies = require('../../data/currencies.json');
const items = require('../../data/items.json');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = async (
  gcScripShopItems
) => {
  const config = require('../config/data').shops;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  gcScripShopItems.reduce((arr, gcScripShopItem) => {
    const match = allItems.find(item => item.id === gcScripShopItem.ItemTargetID);

    if (!match) {
      return arr;
    }

    return [
      ...arr, {
        gcScripShopItem,
        item: match
      }
    ];
  }, []).forEach(entry => {
    const {
      gcScripShopItem,
      item
    } = entry;

    const {
      contentId,
      contentType
    } = item;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    let currency;
    let grandCompany;

    const {
      ID
    } = gcScripShopItem;

    /**
     * Items aren't categorised by their Grand Company or GC vendor.
     * Fortunately we can manually map everything by the gcScripShopItem's ID range.
     */
    if (ID < 10) {
      // Immortal Flames -> Flame Seals
      currency = currencies.find(currency => currency.id === 20);
    } else if (ID < 20) {
      // Maelstrom -> Storm Seals
      currency = currencies.find(currency => currency.id === 21);
    } else if (ID < 30) {
      // Order of the Twin Adder -> Serpent Seals
      currency = currencies.find(currency => currency.id === 22);
    } else {
      // Unknown.
      console.warn(
        `Unhandled Grand Company shop item ID range: ${ID}. Skipping ${contentType} ${contentId}.`
      );
      return;
    }

    parsed[contentType].push({
      contentId,
      cost: gcScripShopItem.CostGCSeals,
      currency
    })
  });

  fs.writeFileSync(
    '../data/methods/shops.json',
    JSON.stringify(parsed),
    'utf8',
    () => console.info(`Shop data parsed.`)
  );
};