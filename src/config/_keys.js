/**
 * This object defines the API key structure.
 * Rather than repeating "description" over and over again for each piece of content, for example,
 * here we convert that into just "d". This is used to reduce download sizes. As an example, For a
 * content list with 1000 entries, converting "description" to "d" for each row would save 10,000
 * bytes!
 */
module.exports = {
  expansions: {
    aRealmReborn: 'arr',
    heavensward: 'hw',
    stormblood: 'sb',
    shadowbringers: 'shb'
  },
  lists: {
    availability: 'a',
    category: 'c',
    description: 'd',
    icon: 'i',
    iconBody: 'i', // The main Barding icon is also mapped to 'i'.
    iconLarge: 'iL',
    iconHead: 'i2',
    iconLegs: 'i3',
    id: 'id',
    isPrefix: 'f',
    kind: 'k',
    name: 'n',
    nameFemale: 'nF',
    namePlural: 'nP',
    nameSingular: 'nS',
    methods: 'm',
    order: 'o',
    patch: 'p',
    points: 'x',
    title: 't'
  },
  overview: {
    available: 'a',
    availableEvent: 'aE',
    availableExternalPromo: 'aP',
    availableLegacy: 'aL',
    availableRealWorldEvent: 'aX',
    availableStorePurchase: 'aM',
    availableUnknown: 'aU',
    name: 'n',
    patchFirst: 'f',
    patchLast: 'l',
    pointsTotal: 'p',
    pointsTotalEvents: 'pE',
    pointsTotalLegacy: 'pL',
    rel: 'r',
    total: 't',
    unlockedByDefault: 'd'
  },
  patches: {
    banner: 'b',
    date: 'd',
    id: 'id',
    isExpansion: 'e',
    name: 'n',
    version: 'v'
  },
  contentFilters: {
    event: 'e',
    externalPromo: 'p',
    legacy: 'l',
    realWorldEvent: 'x',
    startingCity: 'c',
    storePurchase: 'm'
  }
};