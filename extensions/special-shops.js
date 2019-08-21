/**
 * Extend NPCs to include Special Shops which aren't mapped within the game's files.
 * Garland Tools has a similar mapping available at:
 * https://github.com/ufx/GarlandTools/blob/master/Garland.Data/Hacks.cs#L111
 *
 * Remember that `npm run update data` will need running to apply any changes.
 */
const specialShops = require('../data/specialShops.json');

module.exports = {
  // E-Una Kotor
  1017338: [
    // Gelmorran Potsherd Exchange
    specialShops.find(specialShop => specialShop.ID === 1769675)
  ],
  // Disreputable Priest
  1018655: [
    // Exchange Wolf Marks (Melee)
    specialShops.find(specialShop => specialShop.ID === 1769743),
    // Exchange Wolf Marks (Ranged)
    specialShops.find(specialShop => specialShop.ID === 1769744)
  ],
  // Confederate Custodian
  1025848: [
    // Exchange artifacts
    specialShops.find(specialShop => specialShop.ID === 1769871)
  ],
  // Siulmet
  1027385: [
    specialShops.find(specialShop => specialShop.ID === 1769959)
  ],
  // Pedronille
  1027538: [
    specialShops.find(specialShop => specialShop.ID === 1769958)
  ],
  // Gramsol
  1027998: [
    specialShops.find(specialShop => specialShop.ID === 1769958)
  ]
}