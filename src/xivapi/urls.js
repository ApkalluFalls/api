const xivapiBase = 'https://xivapi.com';

module.exports = {
  achievement: (id) => `${xivapiBase}/achievement/${id}`,
  achievements: () => `${xivapiBase}/achievement`,
  barding: () => `${xivapiBase}/buddyequip`,
  bNPCBase: () => `${xivapiBase}/bnpcbase`,
  bNPCName: () => `${xivapiBase}/bnpcname`,
  customTalk: () => `${xivapiBase}/customtalk`,
  fates: () => `${xivapiBase}/fate`,
  gilShop: (id) => `${xivapiBase}/gilshop/${id}`,
  gilShops: (id) => `${xivapiBase}/gilshop`,
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
  retainerVentures: () => `${xivapiBase}/retainertask`,
  retainerVenturesRandom: () => `${xivapiBase}/retainertaskrandom`,
  search: () => `${xivapiBase}/search`,
  spearfishingItems: () => `${xivapiBase}/spearfishingitem`,
  specialShop: (id) => `${xivapiBase}/specialshop/${id}`,
  specialShops: () => `${xivapiBase}/specialshop`,
  territoryTypes: () => `${xivapiBase}/territorytype`,
  treasureHunt: () => `${xivapiBase}/treasurehuntrank`
}