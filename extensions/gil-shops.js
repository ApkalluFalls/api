/**
 * Extend NPCs to include Special Shops which aren't mapped within the game's files.
 * Garland Tools has a similar mapping available at:
 * https://github.com/ufx/GarlandTools/blob/master/Garland.Data/Hacks.cs#L111
 *
 * Remember that `npm run update data` will need running to apply any changes.
 */
const fates = require('../data/fates.json');
const gilShops = require('../data/gilShops.json');

module.exports = {
  bNPCs: {
    // Junkmonger Nonoroon appars after the 'Poor Maid's Misfortune' FATE
    1237: [{
      fate: fates.find(fate => fate.id === 453),
      shop: gilShops.find(gilShop => gilShop.ID === 262404)
    }],
    // Chachamun appears after the 'Attack on Highbridge: Act III' FATE
    1245: [{
      fate: fates.find(fate => fate.id === 194),
      shop: gilShops.find(gilShop => gilShop.ID === 262406)
    }],
    // Boughbury Trader appears after the 'Clearing the Hive' FATE
    2164: [{
      fate: fates.find(fate => fate.id === 160),
      shop: gilShops.find(gilShop => gilShop.ID === 262407)
    }]
  }
}