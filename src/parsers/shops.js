const fs = require('fs');
const currencies = require('../../data/currencies.json');
const items = require('../../data/items.json');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = async (
  eNPCResidents,
  gcScripShopItems
) => {
  const config = require('../config/data').shops;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  const gil = currencies.find(currency => currency.id === 1);

  // Gil shops...
  eNPCResidents.reduce((arr, eNPCResident) => ([
    ...arr,
    ...eNPCResident.GilShop.reduce((arr2, entry) => ([
      ...arr2,
      ...entry.Items.reduce((arr3, gilShopItem) => {
        const match = allItems.find(item => item.id === gilShopItem.ID);

        if (!match) {
          return arr3;
        }

        return [
          ...arr3,
          {
            _eNPCResident: eNPCResident.ID,
            item: {
              ...match,
              cost: gilShopItem.PriceMid
            }
          }
        ]
      }, [])
    ]), [])
  ]), []).forEach(entry => {
    const {
      _eNPCResident,
      item
    } = entry;

    const {
      contentId,
      contentType
    } = item;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    };

    parsed[contentType].push({
      contentId,
      cost: item.cost,
      currency: gil
    })
  });

  // Grand company shops...
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