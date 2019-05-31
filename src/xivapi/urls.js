const xivapiBase = 'https://xivapi.com';

module.exports = {
  fishingSpots: () => `${xivapiBase}/fishingspot`,
  gatheringItems: () => `${xivapiBase}/gatheringitem`,
  gatheringPoints: () => `${xivapiBase}/gatheringpoint`,
  gatheringTypes: () => `${xivapiBase}/gatheringtype`,
  gcScripShopItem: () => `${xivapiBase}/gcscripshopitem`,
  minion: (id) => `${xivapiBase}/companion/${id}`,
  minions: () => `${xivapiBase}/companion`,
  search: () => `${xivapiBase}/search`,
  spearfishingItems: () => `${xivapiBase}/spearfishingitem`
}