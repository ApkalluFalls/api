const xivapiBase = 'https://xivapi.com';

module.exports = {
  achievement: (id) => `${xivapiBase}/achievement/${id}`,
  achievements: () => `${xivapiBase}/achievement`,
  barding: () => `${xivapiBase}/buddyequip`,
  customTalk: () => `${xivapiBase}/customtalk`,
  gilShop: (id) => `${xivapiBase}/gilshop/${id}`,
  emote: (id) => `${xivapiBase}/emote/${id}`,
  emotes: () => `${xivapiBase}/emote`,
  eNPCResident: () => `${xivapiBase}/enpcresident`,
  fishingSpots: () => `${xivapiBase}/fishingspot`,
  gatheringItems: () => `${xivapiBase}/gatheringitem`,
  gatheringPoints: () => `${xivapiBase}/gatheringpoint`,
  gatheringTypes: () => `${xivapiBase}/gatheringtype`,
  gcScripShopItem: () => `${xivapiBase}/gcscripshopitem`,
  instanceContent: () => `${xivapiBase}/instancecontent`,
  minion: (id) => `${xivapiBase}/companion/${id}`,
  minions: () => `${xivapiBase}/companion`,
  mount: (id) => `${xivapiBase}/mount/${id}`,
  mounts: () => `${xivapiBase}/mount`,
  orchestrion: () => `${xivapiBase}/orchestrion`,
  search: () => `${xivapiBase}/search`,
  spearfishingItems: () => `${xivapiBase}/spearfishingitem`,
  specialShop: (id) => `${xivapiBase}/specialshop/${id}`,
  territoryTypes: () => `${xivapiBase}/territorytype`
}