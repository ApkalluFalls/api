const _localisationHelper = require('../src/config/_localisationHelper');
const achievements = require('../data/content/achievements.json');
const instances = require('../data/instances.json');
const items = require('../data/items.json');
const maps = require('../data/maps.json');
const npcs = require('../data/npcs.json');
const retainerVentures = require('../data/retainerVentures.json');

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
    42: [
      { fn: mogStation, args: [] }
    ],
    43: [
      { fn: mogStation, args: [] }
    ],
    46: [
      { fn: mogStation, args: [] }
    ],
    22: [
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
    ]
  },
  emotes: {
    62: [
      { fn: mogStation, args: [] }
    ],
    63: [
      { fn: mogStation, args: [] }
    ],
    109: [
      { fn: mogStation, args: [] }
    ],
    110: [
      { fn: mogStation, args: [] }
    ],
    115: [
      { fn: recruitAFriend, args: [30] }
    ],
    123: [
      { fn: mogStation, args: [] }
    ],
    124: [
      { fn: mogStation, args: [] }
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
    142: [
      { fn: mogStation, args: [] }
    ],
    143: [
      { fn: mogStation, args: [] }
    ],
    146: [
      { fn: mogStation, args: [] }
    ],
    149: [
      { fn: mogStation, args: [] }
    ],
    153: [
      { fn: mogStation, args: [] }
    ],
    181: [
      // Pagos Lockbox
      { fn: itemExchange, args: [23142, 1025950] },
      // Cold-warped Lockbox
      { fn: itemExchange, args: [23379, 1025950] }
    ],
    189: [
      // Heat-warped Lockbox
      { fn: itemExchange, args: [24142, 1026502] }
    ],
    195: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
    ]
  },
  minions: {
    5: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    12: [
      // The Aurum Vale
      { fn: instancedContent, args: [instances.find(instance => instance.id === 5)] }
    ],
    16: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    23: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    27: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
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
      { fn: itemExchange, args: [16170, 1017659] }
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
    121: [
      { fn: mogStation, args: [] }
    ],
    122: [
      // Battle In The Big Keep
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20030)] }
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
    157: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] },
      // Bronze-trimmed Sack
      { fn: itemExchange, args: [16170, 1017659] }
    ],
    159: [
      { fn: mogStation, args: [] }
    ],
    160: [
      // The Void Ark
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30029)] }
    ],
    162: [
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
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    192: [
      { fn: mogStation, args: [] }
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
    232: [
      // Dun Scaith
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30047)] }
    ],
    237: [
      // Silver-haloed Sack
      { fn: itemExchange, args: [23223, 1025847] }
    ],
    238: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
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
    252: [
      // Doma Castle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 54)] }
    ],
    253: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
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
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    286: [
      // Anemos Lockbox
      { fn: itemExchange, args: [22508, 1025048] }
    ],
    287: [
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
    311: [
      { fn: fanFestival, args: [2018, { de: 'Las Vegas', en: 'Las Vegas', fr: 'Las Vegas', ja: 'ラスベガス' }]}
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
    319: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
    ],
    321: [
      // The Ghimlyt Dark
      { fn: instancedContent, args: [instances.find(instance => instance.id === 64)] }
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
    42: [
      { fn: mogStation, args: [] }
    ],
    43: [
      // Akh Afah Amphitheatre (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20025)] }
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
      { fn: fanFestival, args: [2018, { de: 'Paris', en: 'Paris', fr: 'Paris', ja: 'パリ' }]},
      { fn: fanFestival, args: [2018, { de: 'Tokyo', en: 'Tokyo', fr: 'Tokyo', ja: '東京' }]}
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
    161: [
      // The Great Hunt (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20054)] }
    ],
    172: [
      // Hell's Kier (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20058)] }
    ],
    173: [
      // Alphascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30076)] }
    ],
    182: [
      // The Wreath of Snakes (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20061)] }
    ]
  },
  orchestrion: {
    288: [
      // Hydatos Lockbox
      { fn: itemExchange, args: [24848, 1027127] }
    ],
    289: [
      // Moisture-warped Lockbox
      { fn: itemExchange, args: [24849, 1027127] }
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
 * @param {Object} retainerVentureId - The retainer venture ID (from `data/retainerVentures.json`)
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