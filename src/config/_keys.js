/**
 * This object defines the API key structure.
 * Rather than repeating "description" over and over again for each piece of content, for example,
 * here we convert that into just "d". This is used to reduce download sizes. As an example, For a
 * content list with 1000 entries, converting "description" to "d" for each row would save 10,000
 * bytes!
 */
module.exports = {
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
    kind: 'k',
    name: 'n',
    namePlural: 'nP',
    nameSingular: 'nS',
    methods: 'm',
    order: 'o',
    patch: 'p',
    points: 'x'
  },
  overview: {
    pointsTotal: 'p',
    pointsTotalEvents: 'pE',
    pointsTotalLegacy: 'pL',
    total: 't'
  },
  patches: {
    banner: 'b',
    date: 'd',
    id: 'id',
    isExpansion: 'e',
    name: 'n',
    version: 'v'
  },
  achievementAvailability: {
    event: 'e',
    legacy: 'l',
    startingCity: 'c'
  }
};