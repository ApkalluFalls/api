const _localisationHelper = require('../src/config/_localisationHelper');
const achievements = require('../data/content/achievements.json');
const instances = require('../data/instances.json');
const maps = require('../data/maps.json');
const npcs = require('../data/npcs.json');

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
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    23: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    27: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    42: [
      // The Wanderer's Palace
      { fn: instancedContent, args: [instances.find(instance => instance.id === 10)] }
    ],
    44: [
      // Amdapor Keep
      { fn: instancedContent, args: [instances.find(instance => instance.id === 14)] }
    ],
    47: [
      // Copperbell Mines (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 18)] }
    ],
    56: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    57: [
      // Sastasha (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 28)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    79: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    80: [
      // Brayflox's Longstop (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    92: [
      // Syrcus Tower
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30011)] }
    ],
    97: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    101: [
      // The World of Darkness
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30020)] }
    ],
    102: [
      // Hullbreaker Isle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 23)] }
    ],
    104: [
      // The Dragon's Neck
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20026)] }
    ],
    112: [
      // The Sunken Temple of Qarn (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 26)] },
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    122: [
      // Battle In The Big Keep
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20030)] }
    ],
    129: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Heavensward']] }
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
    157: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    160: [
      // The Void Ark
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30029)] }
    ],
    166: [
      // Saint Mocianne's Arboretum
      { fn: instancedContent, args: [instances.find(instance => instance.id === 41)] }
    ],
    176: [
      // Alexander - The Burden of the Son (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30037)] }
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
      { fn: instancedContent, args: [instances.find(instance => instance.id === 42)] }
    ],
    189: [
      // Hullbreaker Isle (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 45)] }
    ],
    195: [
      // The Weeping City of Mhach
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30038)] }
    ],
    197: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    215: [
      // Alexander - The Soul of the Creator
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30042)] },
      // Alexander - The Soul of the Creator (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30046)] }
    ],
    216: [
      // Xelphatol
      { fn: instancedContent, args: [instances.find(instance => instance.id === 46)] }
    ],
    226: [
      // Baelsar's Wall
      { fn: instancedContent, args: [instances.find(instance => instance.id === 48)] }
    ],
    232: [
      // Dun Scaith
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30047)] }
    ],
    238: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
    ],
    245: [
      // Shisui of the Violet Tides
      { fn: instancedContent, args: [instances.find(instance => instance.id === 50)] }
    ],
    247: [
      // Bardam's Mettle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 53)] }
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
      { fn: instancedContent, args: [instances.find(instance => instance.id === 52)] }
    ],
    259: [
      // Deltascape V4.0
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30052)] },
      // Deltascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30056)] }
    ],
    269: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    270: [
      // The Orbonne Monastery
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30077)] }
    ],
    272: [
      // The Drowned City of Skalla
      { fn: instancedContent, args: [instances.find(instance => instance.id === 58)] }
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
    289: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    290: [
      // The Swallow's Compass
      { fn: instancedContent, args: [instances.find(instance => instance.id === 61)] }
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
    312: [
      // Saint Mociannes Arboretum (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 62)] }
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
    40: [
      // The Striking Tree (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20023)] }
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
    90: [
      // The Minstrel's Ballad: Nidhogg's Rage
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20040)] }
    ],
    98: [
      // Containment Bay P1T6 (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20042)] }
    ],
    101: [
      // Alexander - The Soul of the Creator (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30046)] }
    ],
    104: [
      // Containment Bay Z1T9 (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20044)] }
    ],
    111: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
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
    144: [
      // The Jade Stoa (Extreme)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20052)] }
    ],
    156: [
      // Sigmascape V4.0 (Savage)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 30066)] }
    ],
    158: [
      // The Minstrel's Ballad: Tsukuyomi's Pain
      { fn: instancedContent, args: [instances.find(instance => instance.id === 20056)] }
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
  })
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
  })
}