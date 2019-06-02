const xivapiBase = 'https://xivapi.com';

module.exports = {
  achievement: (id) => `${xivapiBase}/achievement/${id}`,
  achievements: () => `${xivapiBase}/achievement`,
  barding: () => `${xivapiBase}/buddyequip`,
  emote: (id) => `${xivapiBase}/emote/${id}`,
  emotes: () => `${xivapiBase}/emote`,
  eNPCResident: () => `${xivapiBase}/enpcresident`,
  fishingSpots: () => `${xivapiBase}/fishingspot`,
  gatheringItems: () => `${xivapiBase}/gatheringitem`,
  gatheringPoints: () => `${xivapiBase}/gatheringpoint`,
  gatheringTypes: () => `${xivapiBase}/gatheringtype`,
  gcScripShopItem: () => `${xivapiBase}/gcscripshopitem`,
  minion: (id) => `${xivapiBase}/companion/${id}`,
  minions: () => `${xivapiBase}/companion`,
  mount: (id) => `${xivapiBase}/mount/${id}`,
  mounts: () => `${xivapiBase}/mount`,
  search: () => `${xivapiBase}/search`,
  spearfishingItems: () => `${xivapiBase}/spearfishingitem`,
  territoryTypes: () => `${xivapiBase}/territorytype`
}