const bNPCs = require('../../data/bNPCs.json');
const currencies = require('../../data/currencies.json');
const customTalk = require('../../data/customTalk.json');
const currencyParser = require('../parsers/currencies');
const extendedGilShops = require('../../extensions/gil-shops');
const extendedSpecialShops = require('../../extensions/special-shops');
const items = require('../../data/items.json');
const fs = require('fs');
const helper = require('../xivapi/helper');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = (
  eNPCResidents,
  gcScripShopItems
) => {
  const config = require('../config/data').shops;

  const {
    eNPCBaseDataRefs,
    specialShopItemIndexes
  } = config.eNPCResident;

  let currenciesAddedCount = 0;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  const gil = currencies.find(currency => currency.id === 1);

  // Extend data set to include Custom Talk Gil Shops and Special Shops.
  eNPCResidents.filter(eNPCResident => {
    const {
      Base
    } = eNPCResident;

    if (!Base) {
      return;
    }

    for (let i = 0; i < eNPCBaseDataRefs; i++) {
      const v = Base[`ENpcData${i}`];

      if (v >= 720000 && v < 730000) {
        return true;
      }
    }
  }).forEach(eNPCResident => {
    for (let i = 0; i < eNPCBaseDataRefs; i++) {
      const v = eNPCResident.Base[`ENpcData${i}`];

      if (v >= 720000 && v < 730000) {
        // Gil shops.
        const customTalkGilShopMatches = customTalk.gilShops.filter(entry => entry.customTalk === v);

        for (const customTalkGilShop of customTalkGilShopMatches) {
          eNPCResident.GilShop.push(customTalkGilShop.data);
        }

        // Special shops.
        const customTalkSpecialShopMatches = customTalk.specialShops.filter(entry => entry.customTalk === v);

        for (const customTalkSpecialShop of customTalkSpecialShopMatches) {
          eNPCResident.SpecialShop.push(customTalkSpecialShop.data);
        }
      }
    }
  });

  // Extend data to include Special Shop extensions.
  eNPCResidents.forEach(eNPCResident => {
    const match = extendedSpecialShops[eNPCResident.ID];

    if (!match) {
      return;
    }

    for (const specialShop of match) {
      eNPCResident.SpecialShop.push(specialShop);
    }
  })

  // Gil shops...
  eNPCResidents.filter(
    eNPCResident => Array.isArray(eNPCResident.GilShop) && eNPCResident.GilShop.length
  ).reduce((arr, eNPCResident) => ([
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
      currency: gil,
      npc: _eNPCResident
    })
  });

  // Special shops...
  eNPCResidents.filter(
    eNPCResident => Array.isArray(eNPCResident.SpecialShop) && eNPCResident.SpecialShop.length
  ).reduce((arr, eNPCResident) => ([
    ...arr,
    ...eNPCResident.SpecialShop.reduce((arr2, specialShop) => ([
      ...arr2,
      ...specialShopItemIndexes.reduce((arr3, specialShopItemIndex) => {
        const match = allItems.find(
          item => item.id === specialShop[`ItemReceive${specialShopItemIndex}TargetID`]
        );

        if (!match) {
          return arr3;
        }

        const specialShopItemCurrency = specialShop[`ItemCost${specialShopItemIndex}TargetID`];
        let currency = currencies.find(currency => currency.id === specialShopItemCurrency);

        // If the currency is missing it means the currency object needs extending.
        if (!currency) {
          currency = addNewCustomCurrencyItem(specialShop[`ItemCost${specialShopItemIndex}`]);
          currenciesAddedCount++;
        }

        return [
          ...arr3, {
            _eNPCResident: eNPCResident.ID,
            _specialShop: specialShop.ID,
            currency,
            item: {
              ...match,
              cost: specialShop[`CountCost${specialShopItemIndex}`],
            }
          }
        ]
      }, [])
    ]), [])
  ]), []).forEach(entry => {
    const {
      _eNPCResident,
      currency,
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
      currency,
      npc: _eNPCResident
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
    let npcId;

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
      npcId = 1002390; // Flame Quartermaster
    } else if (ID < 20) {
      // Maelstrom -> Storm Seals
      currency = currencies.find(currency => currency.id === 21);
      npcId = 1002387; // Storm Quartermaster
    } else if (ID < 30) {
      // Order of the Twin Adder -> Serpent Seals
      currency = currencies.find(currency => currency.id === 22);
      npcId = 1002393; // Serpent Quatermaster
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
      currency,
      npc: npcId
    })
  });

  // BNPC extension entries.
  Object.keys(extendedGilShops.bNPCs).forEach(bNPCID => {
    const id = Number(bNPCID);
    const bNPC = bNPCs.find(bNPC => bNPC.id === id);

    if (!bNPC) {
      console.warn(`Unknown BNPC ID extension added for ${id}. Skipping.`);
      return;
    }

    extendedGilShops.bNPCs[bNPCID].forEach(({ fate, shop }) => {
      if (!fate) {
        console.warn(`Missing 'fate' key for gil shop extension on BNPC ID ${id}. Skipping.`);
        return;
      }

      if (!shop) {
        console.warn(`Missing 'shop' key for gil shop extension on BNPC ID ${id}. Skipping.`);
        return;
      }

      shop.Items.forEach(gilShopItem => {
        const match = allItems.find(item => item.id === gilShopItem.ID);

        if (!match) {
          console.error(`Unable to map extended BNPC gil shop item ID ${gilShopItem.ID} to an item. Unsure how to proceed.`);
          return;
        }

        const {
          contentId,
          contentType
        } = match;
        
        if (!parsed[contentType]) {
          parsed[contentType] = [];
        };
    
        parsed[contentType].push({
          bNPC,
          contentId,
          cost: gilShopItem.PriceMid,
          currency: gil,
          fate
        })
      })
    })
  })

  // If there are new currencies, overwrite the currencies JSON file.
  if (currenciesAddedCount > 0) {
    fs.writeFileSync(
      './data/currencies.json',
      JSON.stringify(currencies),
      'utf8'
    );
    console.info(`Updated Currencies data to include ${currenciesAddedCount} new items.`)
  }

  fs.writeFileSync(
    './data/methods/shops.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`Shop data parsed.`)
};

/**
 * Extend the currencies object with a new item and return that item after processing.
 * @param {Object} item - The item object to add to the currencies object.
 * @returns {Object} - The new currency item.
 */
function addNewCustomCurrencyItem(item) {
  const {
    columns
  } = require('../config/data').currencies;

  const rawCurrency = {};

  // Ensure we have all the columns from the currencies config extracted from the item.
  columns.forEach(key => rawCurrency[key] = item[key]);

  // Send the raw currency data through the parser and extract the parsed data from the output.
  const newCurrency = (currencyParser([rawCurrency], true))[0];

  // Extend the currencies array.
  currencies.push(newCurrency);

  return newCurrency;
}