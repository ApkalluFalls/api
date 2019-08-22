const _localisationHelper = require('../src/config/_localisationHelper');
const achievements = require('../data/content/achievements.json');
const fateLocations = require('./fate-locations');
const fates = require('../data/fates.json');
const instances = require('../data/instances.json');
const items = require('../data/items.json');
const maps = require('../data/maps.json');
const npcs = require('../data/npcs.json');
const quests = require('../data/quests.json');
const retainerVentures = require('../data/retainerVentures.json');
const treasureHunt = require('../data/treasureHunt.json');
const _keys = require('../src/config/_keys');
const keys = _keys.contentFilters;

module.exports = {
  barding: {
    1: [
      // Officially enlist in the Maelstrom.
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 527)] }
    ],
    5: [
      // Officially enlist in the Order of the Twin Adder.
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 528)] }
    ],
    9: [
      // Officially enlist in the Immortal Flames.
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 529)] }
    ],
    13: [
      // Complete the Chocobo Companion's Defender skill tree.
      { fn: companionChocobo, args: ['defender'] }
    ],
    14: [
      // Complete the Chocobo Companion's Attacker skill tree.
      { fn: companionChocobo, args: ['attacker'] }
    ],
    15: [
      // Complete the Chocobo Companion's Healer skill tree.
      { fn: companionChocobo, args: ['healer'] }
    ],
    17: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    22: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    27: [
      { fn: mogStation, args: [] }
    ],
    31: [
      // Vedrfolnir Devoteth
      { fn: fate, args: [871] }
    ],
    36: [
      { fn: forumContest, args: [] }
    ],
    42: [
      { fn: mogStation, args: [] }
    ],
    43: [
      { fn: mogStation, args: [] }
    ],
    46: [
      { fn: mogStation, args: [] }
    ],
    48: [
      // Silver-trimmed Sack
      { fn: itemExchange, args: [16172, 1017659] },
      // Gold-trimmed Sack
      { fn: itemExchange, args: [16173, 1017659] }
    ],
    50: [
      { fn: mogStation, args: [] }
    ],
    51: [
      { fn: mogStation, args: [] }
    ],
    54: [
      // Vedrfolnir Devoteth
      { fn: fate, args: [1194] }
    ],
    58: [
      { fn: mogStation, args: [] }
    ],
    61: [
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    66: [
      // Heat-warped Lockbox
      { fn: itemExchange, args: [24142, 1026502] }
    ],
    68: [
      // Kugane Ohashi
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20059)] }
    ]
  },
  emotes: {
    59: [
      // Acting the Part
      { fn: questInstant, args: [66538] }
    ],
    62: [
      { fn: mogStation, args: [] }
    ],
    63: [
      { fn: mogStation, args: [] }
    ],
    85: [
      // Toss Fit Workout
      { fn: questInstant, args: [66846] }
    ],
    101: [
      // Good for What Ales You
      { fn: questInstant, args: [66962] }
    ],
    102: [
      // Saw That One Coming
      { fn: questInstant, args: [66961] }
    ],
    103: [
      // Help Me, Lord of the Dance
      { fn: questInstant, args: [66963] }
    ],
    104: [
      // The Hammer
      { fn: questInstant, args: [66852] }
    ],
    109: [
      { fn: mogStation, args: [] }
    ],
    110: [
      { fn: mogStation, args: [] }
    ],
    113: [
      // The Ties that Bind
      { fn: questInstant, args: [67114] }
    ],
    114: [
      // Her Last Vow
      { fn: questInstant, args: [66038] }
    ],
    115: [
      { fn: recruitAFriend, args: [30] }
    ],
    120: [
      // Sundrop the Beat
      { fn: questInstant, args: [67705] }
    ],
    121: [
      // Causes and Costs
      { fn: questInstant, args: [67777] }
    ],
    122: [
      // A Spectacle for the Ages
      { fn: questInstant, args: [67775] }
    ],
    123: [
      { fn: mogStation, args: [] }
    ],
    124: [
      { fn: mogStation, args: [] }
    ],
    125: [
      // An Inspector's Gadget
      { fn: questInstant, args: [67671], filters: { [keys.event]: true } },
      { fn: mogStation, args: [] }
    ],
    126: [
      // Piecing Together the Past
      { fn: questInstant, args: [67862] }
    ],
    127: [
      // The Burdens We Bear
      { fn: questInstant, args: [67015] }
    ],
    128: [
      { fn: mogStation, args: [] }
    ],
    129: [
      { fn: mogStation, args: [] }
    ],
    130: [
      { fn: mogStation, args: [] }
    ],
    131: [
      { fn: mogStation, args: [] }
    ],
    132: [
      { fn: mogStation, args: [] }
    ],
    133: [
      { fn: mogStation, args: [] }
    ],
    134: [
      { fn: mogStation, args: [] }
    ],
    135: [
      { fn: mogStation, args: [] }
    ],
    136: [
      { fn: mogStation, args: [] }
    ],
    138: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV MEISTER QUALITY FIGURE – ODIN'] }
    ],
    142: [
      { fn: mogStation, args: [] }
    ],
    143: [
      { fn: mogStation, args: [] }
    ],
    144: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV MEISTER QUALITY FIGURE – SHIVA'] }
    ],
    145: [
      // Eternity, Loyalty, Honesty
      { fn: questInstant, args: [67921] }
    ],
    146: [
      { fn: mogStation, args: [] }
    ],
    148: [
      // Letters from No One
      { fn: questInstant, args: [67899] }
    ],
    149: [
      { fn: mogStation, args: [] }
    ],
    153: [
      { fn: mogStation, args: [] }
    ],
    154: [
      // Confederate Consternation
      { fn: questInstant, args: [68016] }
    ],
    155: [
      // Dear Leader I - 10 successfull Squadron command missions
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 1966)] }
    ],
    156: [
      // Dear Leader I - 10 successfull Squadron command missions
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 1966)] }
    ],
    157: [
      // Dear Leader I - 10 successfull Squadron command missions
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 1966)] }
    ],
    158: [
      // Dear Leader I - 10 successfull Squadron command missions
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 1966)] }
    ],
    166: [
      // Arenvald's Adventure
      { fn: questInstant, args: [68498] }
    ],
    172: [
      // Greetings from the East
      { fn: questInstant, args: [68558] }
    ],
    173: [
      { fn: mogStation, args: [] }
    ],
    174: [
      { fn: mogStation, args: [] }
    ],
    175: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV MEISTER QUALITY FIGURE – ULTIMA'] }
    ],
    178: [
      // Tonight, the Stars Align
      { fn: achievementAuto, args: [achievements.find(achievement => achievement.id === 2014)], filters: { [keys.event]: true } },
      { fn: mogStation, args: [] }
    ],
    181: [
      // Pagos Lockbox
      { fn: itemExchange, args: [23142, 1025950] },
      // Cold-warped Lockbox
      { fn: itemExchange, args: [23379, 1025950] }
    ],
    183: [
      // Emissary of the Dawn
      { fn: questInstant, args: [68612] }
    ],
    185: [
      { fn: mogStation, args: [] }
    ],
    186: [
      { fn: mogStation, args: [] }
    ],
    187: [
      // The Fire-bird Down Below
      { fn: questInstant, args: [68688] }
    ],
    188: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    189: [
      // Heat-warped Lockbox
      { fn: itemExchange, args: [24142, 1026502] }
    ],
    190: [
      // The Call
      { fn: questInstant, args: [68684] }
    ],
    191: [
      { fn: companionApp, args: [] }
    ],
    194: [
      // What a Wonder-full World
      { fn: questInstant, args: [68700] }
    ],
    195: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
    ],
    197: [
      // The Sabotender Shimmy
      { fn: questInstant, args: [68743], filters: { [keys.event]: true } },
    ],
    198: [
      // Don't Do the Dewprism
      { fn: questInstant, args: [68704] }
    ],
    199: [
      // Learning to Lali-ho
      { fn: questInstant, args: [69095] }
    ],
  },
  minions: {
    4: [
      { fn: preOrder, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    5: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    12: [
      // The Aurum Vale
      { fn: instancedContent, args: [instances.find(instance => instance.id === 5)] }
    ],
    14: [
      // Lazy For You
      { fn: fate, args: [218] }
    ],
    16: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] },
      // Peisteskin Map
      { fn: timewornMap, args: [5] },
      // Dragonskin Map
      { fn: timewornMap, args: [11] }
    ],
    18: [
      // Go, Go, Gorgimera
      { fn: fate, args: [647] }
    ],
    23: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] },
      // Boarskin Map
      { fn: timewornMap, args: [4] }
    ],
    27: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] },
      // Toadskin Map
      { fn: timewornMap, args: [3] }
    ],
    31: [
      // The Eyes Have It
      { fn: fate, args: [507] }
    ],
    34: [
      // It's Not Lupus
      { fn: fate, args: [335] }
    ],
    39: [
      // Where's The Beef (Diadem)
      { fn: fate, args: [1035] }
    ],
    42: [
      // The Wanderer's Palace
      { fn: instancedContent, args: [instances.find(instance => instance.id === 10)] }
    ],
    44: [
      // Amdapor Keep
      { fn: instancedContent, args: [instances.find(instance => instance.id === 14)] }
    ],
    46: [
      { fn: mogStation, args: [] }
    ],
    47: [
      // Copperbell Mines (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 18)] }
    ],
    55: [
      { fn: squareEnixStore, args: ['BEFORE METEOR FINAL FANTASY® XIV ORIGINAL SOUNDTRACK'] }
    ],
    56: [
      // Field Exploration XIII
      { fn: retainerVenture, args: [30013] },
      // Highland Exploration XIII
      { fn: retainerVenture, args: [30026] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    57: [
      // Sastasha (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 28)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    63: [
      { fn: mogStation, args: [] }
    ],
    64: [
      { fn: mogStation, args: [] }
    ],
    78: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: A REALM REBORN™ ORIGINAL SOUNDTRACK'] }
    ],
    79: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    80: [
      // Brayflox's Longstop (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    86: [
      { fn: gardening, args: [8184, 144] }
    ],
    87: [
      { fn: gardening, args: [8185, 144] }
    ],
    88: [
      { fn: gardening, args: [8186, 144] }
    ],
    89: [
      { fn: gardening, args: [8187, 144] }
    ],
    90: [
      { fn: gardening, args: [8188, 144] }
    ],
    91: [
      { fn: mogStation, args: [] }
    ],
    92: [
      // Syrcus Tower
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30011)] }
    ],
    94: [
      // Field Exploration XIV
      { fn: retainerVenture, args: [30054] },
      // Field Exploration XV
      { fn: retainerVenture, args: [30058] },
      // Field Exploration XVI
      { fn: retainerVenture, args: [30062] }
    ],
    96: [
      // Field Exploration XIV
      { fn: retainerVenture, args: [30054] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    97: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] },
      // Unhidden Map
      { fn: timewornMap, args: [7] }
    ],
    98: [
      { fn: mogStation, args: [] }
    ],
    99: [
      { fn: mogStation, args: [] }
    ],
    101: [
      // The World of Darkness
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30020)] }
    ],
    102: [
      // Hullbreaker Isle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 23)] }
    ],
    103: [
      { fn: mogStation, args: [] }
    ],
    104: [
      // The Dragon's Neck
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20026)] }
    ],
    105: [
      { fn: mogStation, args: [] }
    ],
    107: [
      { fn: mogStation, args: [] }
    ],
    108: [
      { fn: mogStation, args: [] }
    ],
    109: [
      { fn: mogStation, args: [] }
    ],
    110: [
      // Waterside Exploration XIV
      { fn: retainerVenture, args: [30057] },
      // Waterside Exploration XV
      { fn: retainerVenture, args: [30061] },
      // Waterside Exploration XVI
      { fn: retainerVenture, args: [30065] },
      // Waterside Exploration XVII
      { fn: retainerVenture, args: [30069] },
      // Waterside Exploration XVIII
      { fn: retainerVenture, args: [30073] }
    ],
    111: [
      // Woodland Exploration XIV
      { fn: retainerVenture, args: [30056] },
      // Woodland Exploration XV
      { fn: retainerVenture, args: [30060] },
      // Woodland Exploration XVI
      { fn: retainerVenture, args: [30064] },
      // Woodland Exploration XVII
      { fn: retainerVenture, args: [30068] },
      // Woodland Exploration XVIII
      { fn: retainerVenture, args: [30072] }
    ],
    112: [
      // The Sunken Temple of Qarn (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 26)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    113: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: A REALM REBORN™ THE ART OF EORZEA - ANOTHER DAWN'] }
    ],
    114: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: A REALM REBORN™ DELIVERY MOOGLE'] }
    ],
    121: [
      { fn: mogStation, args: [] }
    ],
    122: [
      // Battle In The Big Keep
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20030)] }
    ],
    128: [
      { fn: preOrder, args: [_localisationHelper.misc['Heavensward']] }
    ],
    129: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Heavensward']] }
    ],
    131: [
      { fn: mogStation, args: [] }
    ],
    132: [
      { fn: mogStation, args: [] }
    ],
    134: [
      // The Vault
      { fn: instancedContent, args: [instances.find(instance => instance.id === 34)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    137: [
      // The Fractal Continuum
      { fn: instancedContent, args: [instances.find(instance => instance.id === 35)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    138: [
      // Neverreap
      { fn: instancedContent, args: [instances.find(instance => instance.id === 33)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    139: [
      // Sohm Al
      { fn: instancedContent, args: [instances.find(instance => instance.id === 37)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    141: [
      // The Aery
      { fn: instancedContent, args: [instances.find(instance => instance.id === 39)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    142: [
      // The Great Gubal Library
      { fn: instancedContent, args: [instances.find(instance => instance.id === 31)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    145: [
      { fn: mogStation, args: [] }
    ],
    146: [
      // Waterside Exploration XVIII
      { fn: retainerVenture, args: [30073] },
      // Waterside Exploration XIX
      { fn: retainerVenture, args: [30077] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    150: [
      { fn: mogStation, args: [] }
    ],
    151: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: HEAVENSWARD™ EMERALD CARBUNCLE'] }
    ],
    152: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: HEAVENSWARD™ TOPAZ CARBUNCLE'] }
    ],
    154: [
      // On Dangerous Ground
      { fn: fate, args: [855] }
    ],
    155: [
      { fn: squareEnixStore, args: ['BEFORE THE FALL: FINAL FANTASY® XIV ORIGINAL SOUNDTRACK'] }
    ],
    157: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] },
      // Dragonskin Map
      { fn: timewornMap, args: [11] }
    ],
    159: [
      { fn: mogStation, args: [] }
    ],
    160: [
      // The Void Ark
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30029)] }
    ],
    161: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: HEAVENSWARD™ THE ART OF ISHGARD - STONE AND STEEL'] }
    ],
    162: [
      // On The Inside (Diadem)
      { fn: fate, args: [1094] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    166: [
      // Saint Mocianne's Arboretum
      { fn: instancedContent, args: [instances.find(instance => instance.id === 41)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    169: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    176: [
      // Alexander - The Burden of the Son (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30037)] }
    ],
    177: [
      { fn: mogStation, args: [] }
    ],
    178: [
      // The Antitower
      { fn: instancedContent, args: [instances.find(instance => instance.id === 43)] }
    ],
    179: [
      // The Antitower
      { fn: instancedContent, args: [instances.find(instance => instance.id === 43)] }
    ],
    180: [
      // The Lost City Of Amdapor (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 42)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    182: [
      { fn: squareEnixStore, args: ['HEAVENSWARD: FINAL FANTASY® XIV ORIGINAL SOUNDTRACK'] }
    ],
    185: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    186: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    189: [
      // Hullbreaker Isle (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 45)] }
    ],
    190: [
      // Secret Of The Lost Legend (Diadem)
      { fn: fate, args: [968] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    192: [
      { fn: mogStation, args: [] }
    ],
    194: [
      // Blood Wings (Diadem)
      { fn: fate, args: [1050] }
    ],
    195: [
      // The Weeping City of Mhach
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30038)] }
    ],
    197: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    200: [
      { fn: yokaiWatch, args: [] }
    ],
    201: [
      { fn: yokaiWatch, args: [] }
    ],
    202: [
      { fn: yokaiWatch, args: [] }
    ],
    203: [
      { fn: yokaiWatch, args: [] }
    ],
    204: [
      { fn: yokaiWatch, args: [] }
    ],
    205: [
      { fn: yokaiWatch, args: [] }
    ],
    206: [
      { fn: yokaiWatch, args: [] }
    ],
    207: [
      { fn: yokaiWatch, args: [] }
    ],
    208: [
      { fn: yokaiWatch, args: [] }
    ],
    209: [
      { fn: yokaiWatch, args: [] }
    ],
    210: [
      { fn: yokaiWatch, args: [] }
    ],
    211: [
      { fn: yokaiWatch, args: [] }
    ],
    212: [
      { fn: yokaiWatch, args: [] }
    ],
    214: [
      { fn: squareEnixStore, args: ['ENCYCLOPAEDIA EORZEA - THE WORLD OF FINAL FANTASY XIV'] }
    ],
    215: [
      // Alexander - The Soul of the Creator
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30042)] },
      // Alexander - The Soul of the Creator (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30046)] }
    ],
    216: [
      // Xelphatol
      { fn: instancedContent, args: [instances.find(instance => instance.id === 46)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    219: [
      // Iron-trimmed Sack
      { fn: itemExchange, args: [16171, 1017659] }
    ],
    220: [
      { fn: fanFestival, args: [2016, { de: 'Frankfurt', en: 'Frankfurt', fr: 'Francfort', ja: 'フランクフルト' }] },
      { fn: fanFestivalStream, args: [2016, { de: 'Frankfurt', en: 'Frankfurt', fr: 'Francfort', ja: 'フランクフルト' }] }
    ],
    221: [
      { fn: fanFestival, args: [2016, { de: 'Las Vegas', en: 'Las Vegas', fr: 'Las Vegas', ja: 'ラスベガス' }] },
      { fn: fanFestivalStream, args: [2016, { de: 'Las Vegas', en: 'Las Vegas', fr: 'Las Vegas', ja: 'ラスベガス' }] }
    ],
    222: [
      { fn: fanFestival, args: [2016, { de: 'Tokyo', en: 'Tokyo', fr: 'Tokyo', ja: '東京' }] },
      { fn: fanFestivalStream, args: [2016, { de: 'Tokyo', en: 'Tokyo', fr: 'Tokyo', ja: '東京' }] }
    ],
    225: [
      { fn: mogStation, args: [] }
    ],
    226: [
      // Baelsar's Wall
      { fn: instancedContent, args: [instances.find(instance => instance.id === 48)] }
    ],
    227: [
      { fn: mogStation, args: [] }
    ],
    229: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV HEAVENSWARD™ THE ART OF ISHGARD - THE SCARS OF WAR'] }
    ],
    232: [
      // Dun Scaith
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30047)] }
    ],
    233: [
      { fn: squareEnixStore, args: ['THE FAR EDGE OF FATE: FINAL FANTASY® XIV ORIGINAL SOUNDTRACK'] }
    ],
    237: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    238: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
    ],
    239: [
      { fn: preOrder, args: [_localisationHelper.misc['Stormblood']] }
    ],
    241: [
      // Highland Exploration XIX
      { fn: retainerVenture, args: [30075] },
      // Highland Exploration XX
      { fn: retainerVenture, args: [30079] },
      // Highland Exploration XXI
      { fn: retainerVenture, args: [30083] },
      // Highland Exploration XXII
      { fn: retainerVenture, args: [30087] },
      // Woodland Exploration XIX
      { fn: retainerVenture, args: [30076] },
      // Woodland Exploration XX
      { fn: retainerVenture, args: [30080] },
      // Woodland Exploration XXI
      { fn: retainerVenture, args: [30084] },
      // Woodland Exploration XXII
      { fn: retainerVenture, args: [30088] },
      // Waterside Exploration XIX
      { fn: retainerVenture, args: [30077] },
      // Waterside Exploration XX
      { fn: retainerVenture, args: [30081] },
      // Waterside Exploration XXI
      { fn: retainerVenture, args: [30085] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    244: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    245: [
      // Shisui of the Violet Tides
      { fn: instancedContent, args: [instances.find(instance => instance.id === 50)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    246: [
      // Field Exploration XX
      { fn: retainerVenture, args: [30078] },
      // Field Exploration XXII
      { fn: retainerVenture, args: [30086] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    247: [
      // Bardam's Mettle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 53)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    249: [
      // Kugane Castle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 57)] }
    ],
    251: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: STORMBLOOD™ ART OF THE REVOLUTION - WESTERN MEMORIES'] }
    ],
    252: [
      // Doma Castle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 54)] }
    ],
    253: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] },
      // Gazelleskin Map
      { fn: timewornMap, args: [13] }
    ],
    254: [
      // The Temple of the Fist
      { fn: instancedContent, args: [instances.find(instance => instance.id === 51)] }
    ],
    257: [
      // Castrum Abania
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55)] }
    ],
    258: [
      // The Sirensong Sea
      { fn: instancedContent, args: [instances.find(instance => instance.id === 52)] },
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    259: [
      // Deltascape V4.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30052)] },
      // Deltascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30056)] }
    ],
    261: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    262: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    263: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] },
      // Gold-haloed Sack
      { fn: itemExchange, args: [23224, 1025847] }
    ],
    267: [
      // Highland Exploration XXII
      { fn: retainerVenture, args: [30087] }
    ],
    268: [
      // Field Exploration XXII
      { fn: retainerVenture, args: [30086] }
    ],
    269: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    270: [
      // The Orbonne Monastery
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30077)] }
    ],
    271: [
      // Quick Exploration
      { fn: retainerVenture, args: [30053] },
      // Woodland Exploration XXII
      { fn: retainerVenture, args: [30088] }
    ],
    272: [
      // The Drowned City of Skalla
      { fn: instancedContent, args: [instances.find(instance => instance.id === 58)] }
    ],
    273: [
      // Waterside Exploration XXII
      { fn: retainerVenture, args: [30089] }
    ],
    279: [
      // Hell's Lid
      { fn: instancedContent, args: [instances.find(instance => instance.id === 59)] }
    ],
    281: [
      // Sigmascape V4.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30062)] },
      // Sigmascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30066)] }
    ],
    285: [
      // Wine And Honey (Eureka Anemos)
      { fn: fate, args: [1331] },
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    286: [
      // Short Serket 2 (Eureka Anemos)
      { fn: fate, args: [1339] },
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    287: [
      // The Shadow Over Anemos (Eureka Anemos)
      { fn: fate, args: [1348] },
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    289: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    290: [
      // The Swallow's Compass
      { fn: instancedContent, args: [instances.find(instance => instance.id === 61)] }
    ],
    295: [
      // Pagos Lockbox
      { fn: itemExchange, args: [23142, 1025950] }
    ],
    296: [
      // Pagos Lockbox
      { fn: itemExchange, args: [23142, 1025950] }
    ],
    297: [
      { fn: squareEnixStore, args: ['STORMBLOOD: FINAL FANTASY® XIV ORIGINAL SOUNDTRACK'] }
    ],
    299: [
      // The Ridorana Lighthouse
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30068)] }
    ],
    301: [
      // The Great Hunt (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20054)] }
    ],
    305: [
      // Alphascape V4.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30072)] },
      // Alphascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30076)] }
    ],
    309: [
      { fn: fanFestival, args: [2019, { de: 'Paris', en: 'Paris', fr: 'Paris', ja: 'パリ' }]},
      { fn: mogStation, args: [] }
    ],
    310: [
      { fn: fanFestival, args: [2019, { de: 'Tokyo', en: 'Tokyo', fr: 'Tokyo', ja: '東京' }] },
      { fn: mogStation, args: [] }
    ],
    311: [
      { fn: fanFestival, args: [2018, { de: 'Las Vegas', en: 'Las Vegas', fr: 'Las Vegas', ja: 'ラスベガス' }]},
      { fn: mogStation, args: [] }
    ],
    312: [
      // Saint Mociannes Arboretum (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 62)] }
    ],
    315: [
      // Pyros Lockbox
      { fn: itemExchange, args: [24141, 1026502] },
      // Heat-warped Lockbox
      { fn: itemExchange, args: [24142, 1026502] }
    ],
    317: [
      { fn: preOrder, args: [_localisationHelper.misc['Shadowbringers']] }
    ],
    319: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
    ],
    320: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV: STORMBLOOD | ART OF THE REVOLUTION - EASTERN MEMORIES'] }
    ],
    321: [
      // The Ghimlyt Dark
      { fn: instancedContent, args: [instances.find(instance => instance.id === 64)] }
    ],
    325: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Shadowbringers']] }
    ]
  },
  mounts: {
    4: [
      { fn: legacyLevelGoal, args: [30, _localisationHelper.misc['Legacy (1.0)']] }
    ],
    5: [
      { fn: legacyStatus, args: [90, 9, _localisationHelper.misc['Legacy (1.0)']]}
    ],
    8: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    22: [
      // The Bowl of Embers (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20008)] },
      // The Howling Eye (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20010)] },
      // The Navel (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20009)] }
    ],
    25: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    28: [
      // The Bowl of Embers (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20008)] }
    ],
    29: [
      // The Howling Eye (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20010)] }
    ],
    30: [
      // The Navel (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20009)] }
    ],
    31: [
      // The Whorleater (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20018)] }
    ],
    34: [
      { fn: recruitAFriend, args: [90] }
    ],
    40: [
      // The Striking Tree (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20023)] }
    ],
    41: [
      // The Ties that Bind
      { fn: questInstant, args: [67114] }
    ],
    42: [
      { fn: mogStation, args: [] }
    ],
    43: [
      // Akh Afah Amphitheatre (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20025)] }
    ],
    50: [
      // Fetters of Lament
      { fn: questInstant, args: [67204] }
    ],
    54: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Heavensward']] }
    ],
    58: [
      // Alexander - The Burden of the Father (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30028)] }
    ],
    62: [
      { fn: mogStation, args: [] }
    ],
    68: [
      { fn: mogStation, args: [] }
    ],
    69: [
      { fn: mogStation, args: [] }
    ],
    71: [
      { fn: fanFestival, args: [2018, { de: 'Las Vegas', en: 'Las Vegas', fr: 'Las Vegas', ja: 'ラスベガス' }]},
      { fn: fanFestival, args: [2019, { de: 'Paris', en: 'Paris', fr: 'Paris', ja: 'パリ' }]},
      { fn: fanFestival, args: [2019, { de: 'Tokyo', en: 'Tokyo', fr: 'Tokyo', ja: '東京' }]}
    ],
    74: [
      { fn: mogStation, args: [] }
    ],
    75: [
      // The Limitless Blue (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20034)] }
    ],
    76: [
      // Thok Ast Thok (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20032)] }
    ],
    77: [
      // The Minstrel's Ballad: Thordan's Reign
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20036)] }
    ],
    78: [
      // Containment Bay S1T7 (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20038)] }
    ],
    81: [
      { fn: externalPromotion, args: ['いろはす討滅戦2017'] },
      { fn: externalPromotion, args: ['FFXIV and Amazon.com® Free DLC Giveaway'] },
      { fn: externalPromotion, args: ['Dr Pepper-Kampagne!'] },
      { fn: externalPromotion, args: ['Final Fantasy XIV Events with O2'] }
    ],
    82: [
      { fn: externalPromotion, args: ['FF14×セブンイレブンコラボ'] },
      { fn: externalPromotion, args: ['FFXIV and Amazon.com® Summer DLC Campaign'] },
      { fn: externalPromotion, args: ['In-Game Item Campaign with GamesMaster Magazine'] },
      { fn: externalPromotion, args: ['ShopTo In-Game Item Campaign'] }
    ],
    84: [
      { fn: mogStation, args: [] }
    ],
    90: [
      // The Minstrel's Ballad: Nidhogg's Rage
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20040)] }
    ],
    97: [
      { fn: mogStation, args: [] }
    ],
    98: [
      // Containment Bay P1T6 (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20042)] }
    ],
    100: [
      // Gold-trimmed Sack
      { fn: itemExchange, args: [16173, 1017659] }
    ],
    101: [
      // Alexander - The Soul of the Creator (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30046)] }
    ],
    104: [
      // Containment Bay Z1T9 (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20044)] }
    ],
    106: [
      { fn: mogStation, args: [] }
    ],
    111: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
    ],
    112: [
      { fn: externalPromotion, args: [{ de: 'Reittier-Kampagne: "Der Falke"', en: 'Fly the Falcon Mount Campaign', fr: 'Campagne monture mini aéronef Faucon', ja: 'マウント「ファルコン号」GET!キャンペーン' }] },
    ],
    115: [
      // Emanation (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20049)] }
    ],
    116: [
      // The Pool of Tribute (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20047)] }
    ],
    121: [
      // Ala Mhigo
      { fn: instancedContent, args: [instances.find(instance => instance.id === 56)] }
    ],
    126: [
      // Deltascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30056)] }
    ],
    133: [
      // The Minstrel's Ballad: Shinryu's Domain
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20050)] }
    ],
    135: [
      { fn: mogStation, args: [] }
    ],
    138: [
      { fn: mogStation, args: [] }
    ],
    139: [
      { fn: mogStation, args: [] }
    ],
    143: [
      { fn: mogStation, args: [] }
    ],
    144: [
      // The Jade Stoa (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20052)] }
    ],
    150: [
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    156: [
      // Sigmascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30066)] }
    ],
    158: [
      // The Minstrel's Ballad: Tsukuyomi's Pain
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20056)] }
    ],
    159: [
      // Platinum-haloed Sack
      { fn: itemExchange, args: [23225, 1025847] }
    ],
    160: [
      { fn: mogStation, args: [] }
    ],
    161: [
      // The Great Hunt (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20054)] }
    ],
    170: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Shadowbringers']] }
    ],
    171: [
      { fn: mogStation, args: [] }
    ],
    172: [
      // Hell's Kier (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20058)] }
    ],
    173: [
      // Alphascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30076)] }
    ],
    175: [
      { fn: mogStation, args: [] }
    ],
    177: [
      { fn: externalPromotion, args: ['FFXIV and Amazon.com® Free DLC Giveaway!'] }
    ],
    182: [
      // The Wreath of Snakes (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20061)] }
    ]
  },
  orchestrion: {
    114: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: DUALITY'] }
    ],
    115: [
      { fn: squareEnixStore, args: ['FINAL FANTASY® XIV: DUALITY'] }
    ],
    161: [
      // The Evil Seed
      { fn: fate, args: [1129] }
    ],
    162: [
      // Never Say Daimyo
      { fn: fate, args: [1172] }
    ],
    165: [,
      // Gazelleskin Map
      { fn: timewornMap, args: [13] }
    ],
    166: [,
      // Gazelleskin Map
      { fn: timewornMap, args: [13] }
    ],
    167: [,
      // Gazelleskin Map
      { fn: timewornMap, args: [13] }
    ],
    191: [
      { fn: squareEnixStore, args: ['EORZEAN SYMPHONY: FINAL FANTASY® XIV ORCHESTRAL ALBUM'] }
    ],
    192: [
      { fn: squareEnixStore, args: ['EORZEAN SYMPHONY: FINAL FANTASY® XIV ORCHESTRAL ALBUM'] }
    ],
    208: [
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    209: [
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    253: [
      // Deltascape V1.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30049)] },
      // Deltascape V2.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30050)] },
      // Deltascape V3.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30051)] }
    ],
    256: [
      // Sigmascape V1.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30059)] },
      // Sigmascape V2.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30060)] },
      // Sigmascape V3.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30061)] }
    ],
    277: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV - THE BEST'] }
    ],
    278: [
      { fn: squareEnixStore, args: ['FINAL FANTASY XIV - THE BEST'] }
    ],
    279: [
      { fn: squareEnixStore, args: ['THE PRIMALS ZEPP TOUR 2018 - TRIAL BY SHADOW'] }
    ],
    280: [
      { fn: squareEnixStore, args: ['THE PRIMALS ZEPP TOUR 2018 - TRIAL BY SHADOW'] }
    ],
    288: [
      // Hydatos Lockbox
      { fn: itemExchange, args: [24848, 1027127] }
    ],
    289: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
    ],
    290: [
      // The Baldesion Arsenal
      { fn: fate, args: [1422] }
    ],
    305: [
      { fn: squareEnixStore, args: ['JOURNEYS: FINAL FANTASY XIV ARRANGEMENT ALBUM'] }
    ],
    306: [
      { fn: squareEnixStore, args: ['JOURNEYS: FINAL FANTASY XIV ARRANGEMENT ALBUM'] }
    ]
  }
};

/**
 * Content awarded automatically following unlocking an achievement.
 * @param {Number} contentId - The ID of the content
 * @param {Object} achievement - The achievement object (from `data/content/achievements.json`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function achievementAuto(contentId, achievement, language) {
  return _localisationHelper.achievementShort({
    contentId,
    ...achievement
  }, language);
}

/**
 * Collectors edition bonuses.
 * @param {Number} contentId - The ID of the content
 * @param {String} expansion - The expansion the content belongs to. (e.g. `"heavensward"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function collectorsEdition(contentId, expansion, language) {
  return _localisationHelper.collectorsEditionShort({
    contentId,
    expansion
  }, language);
}

/**
 * Companion app (Mobile).
 * @param {Number} contentId - The ID of the content
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function companionApp(contentId, language) {
  return _localisationHelper.companionAppShort({
    contentId
  }, language)
}

/**
 * Companion chocobo-related.
 * @param {Number} contentId - The ID of the content
 * @param {String} skillTree - The skill tree related to the content (e.g. `"defender"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function companionChocobo(contentId, skillTree, language) {
  return _localisationHelper.companionChocoboShort({
    contentId,
    skillTree
  }, language)
}

/**
 * External Promotional events.
 * @param {Number} contentId - The ID of the content
 * @param {String} name - The promotion's name (e.g. `"'Dr Pepper-Kampagne!"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function externalPromotion(contentId, name, language) {
  return _localisationHelper.externalPromotionShort({
    contentId,
    name
  }, language);
}

/**
 * Fan Festival attendance.
 * @param {Number} contentId - The ID of the content
 * @param {Number} year - The year the festival was held
 * @param {Object} location - A location name
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function fanFestival(contentId, year, location, language) {
  return _localisationHelper.fanFestivalShort({
    contentId,
    year,
    location
  }, language)
}

/**
 * Fan Festival attendance.
 * @param {Number} contentId - The ID of the content
 * @param {Number} year - The year the festival was held
 * @param {Object} location - A location name
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function fanFestivalStream(contentId, year, location, language) {
  return _localisationHelper.fanFestivalStreamShort({
    contentId,
    year,
    location
  }, language)
}

/**
 * Timeworn Maps.
 * @param {Number} contentId - The ID of the content
 * @param {Number} fateId - The FATE's ID (from `data/fates.json`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function fate(contentId, fateId, language) {
  const fate = fates.find(fate => fate.id === fateId);

  if (!fate) {
    console.warn(`Unable to find FATE ${fateId}. Skipping.`);
    return;
  }

  const info = fateLocations[fate.id];

  if (!info) {
    console.warn(`An extension is required for FATE ${fateId}'s location. Skipping.`);
    return;
  }

  const map = maps.find(map => map.id === info.location);

  if (!map) {
    console.warn(`FATE ${fateId}'s extension is pointing to an invalid location. Skipping.`);
    return;
  }

  const response = {
    contentId,
    fate,
    map
  };

  if (info.x) {
    return _localisationHelper.fates.fateShort({
      ...response,
      x: info.x,
      y: info.y
    }, language);
  }

  return _localisationHelper.fates.instancedFATEShort(response, language);
}

/**
 * Forum contests.
 * @param {Number} contentId - The ID of the content
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function forumContest(contentId, language) {
  return _localisationHelper.forumContestShort({
    contentId
  }, language)
}

/**
 * 
 * @param {Number} contentId - The ID of the content
 * @param {Number} itemId - The seed item's ID
 * @param {Number} hoursToGrow - The minimum time the item requires to grow 
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function gardening(contentId, itemId, hoursToGrow, language) {
  const item = items.misc.find(item => item.id === itemId);

  if (!item) {
    console.warn(`Unable to find a gardening item with ID ${itemId}. Skipping.`);
    return;
  }

  return _localisationHelper.gardeningShort({
    contentId,
    item,
    hoursToGrow
  }, language)
}

/**
 * Instanced content like dungeons.
 * @param {Number} contentId - The ID of the content
 * @param {Object} instance - The instance object (from `data/instances.json`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function instancedContent(contentId, instance, language) {
  return _localisationHelper.instanceShort({
    contentId,
    ...instance
  }, language)
}

/**
 * Item exchange rewards.
 * @param {Number} contentId - The ID of the content
 * @param {Number} itemId - The item's ID
 * @param {Number} npcId - The id of the NPC which accepts the item
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function itemExchange(contentId, itemId, npcId, language) {
  const item = items.misc.find(item => item.id === itemId);

  if (!item) {
    console.warn(`Unable to find an exchange item with ID ${itemId}. Skipping.`);
    return;
  }

  const npc = npcs.find(npc => npc.id === npcId);

  if (!npc) {
    console.warn(`Unable to find NPC with ID ${npcId} for exchange item ID ${itemId}. Skipping.`);
    return;
  }

  if (!npc.location) {
    console.warn(`Missing location data for item exchange NPC ${npcId}. Skipping.`);
    return;
  }

  const map = maps.find(map => map.id === npc.location);

  return _localisationHelper.itemExchangeShort({
    contentId,
    item,
    map,
    npc
  }, language);
}

/**
 * Legacy level goal.
 * @param {Number} contentId - The ID of the content
 * @param {Number} level - Character level
 * @param {String} expansion - Game expansion
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function legacyLevelGoal(contentId, level, expansion, language) {
  return _localisationHelper.legacyLevelGoalShort({
    contentId,
    expansion,
    level
  }, language)
}

/**
 * Legacy status.
 * @param {Number} contentId - The ID of the content
 * @param {Number} days - Number of days
 * @param {Number} months - Number of months
 * @param {String} expansion - Game expansion
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function legacyStatus(contentId, days, months, expansion, language) {
  return _localisationHelper.legacyStatusShort({
    contentId,
    days,
    expansion,
    months
  }, language)
}

/**
 * Mog Station purchases.
 * @param {Number} contentId - The ID of the content
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function mogStation(contentId, language) {
  return _localisationHelper.mogStationShort({
    contentId
  }, language)
}

/**
 * Expansion pre-order
 * @param {Number} contentId - The ID of the content
 * @param {String} expansion - The expansion the content belongs to. (e.g. `"heavensward"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function preOrder(contentId, expansion, language) {
  return _localisationHelper.preOrderShort({
    contentId,
    expansion
  }, language);
}

function questInstant(contentId, questId, language) {
  const quest = quests.find(quest => quest.quest === questId);

  if (!quest) {
    console.warn(`Unable to find quest with ID ${questId}. Skipping.`);
    return;
  }
  return _localisationHelper.quest.instantShort({
    contentId,
    ...quest
  }, language)
}

/**
 * Recruit A Friend campaign.
 * @param {Number} contentId - The ID of the content
 * @param {Number} days - Number of days
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function recruitAFriend(contentId, days, language) {
  return _localisationHelper.recruitAFriendShort({
    contentId,
    days
  }, language)
}

/**
 * Retainer ventures.
 * @param {Number} contentId - The ID of the content
 * @param {Number} retainerVentureId - The retainer venture ID (from `data/retainerVentures.json`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function retainerVenture(contentId, retainerVentureId, language) {
  const venture = retainerVentures.find(venture => venture.id === retainerVentureId);

  if (!venture) {
    console.warn(`Unable to find retainer venture data for ${retainerVentureId}. Skipping.`);
    return;
  }

  return _localisationHelper.retainerVentureShort({
    contentId,
    ...venture
  }, language)
}

/**
 * Square Enix store purchase.
 * @param {Number} contentId - The ID of the content
 * @param {String} item - The item required to purchase
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function squareEnixStore(contentId, item, language) {
  return _localisationHelper.squareEnixStoreShort({
    contentId,
    item
  }, language)
}

/**
 * Timeworn Maps.
 * @param {Number} contentId - The ID of the content
 * @param {Number} treasureHuntId - The treasure hunt's ID (from `data/treasureHunt.json`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function timewornMap(contentId, treasureHuntId, language) {
  const item = treasureHunt.find(item => item.id === treasureHuntId);

  if (!item) {
    console.warn(`Unable to find treasure hunt data for ${treasureHuntId}. Skipping.`);
    return;
  }

  return _localisationHelper.treasureHuntShort({
    contentId,
    ...item
  }, language)
}

/**
 * Yo-kai Watch cross-over event.
 * @param {Number} contentId - The ID of the content
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function yokaiWatch(contentId, language) {
  return _localisationHelper.yokaiWatchShort({
    contentId
  }, language)
}