const _localisationHelper = require('../src/config/_localisationHelper');
const instances = require('../data/instances.json');

module.exports = {
  barding: {
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
    97: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    102: [
      // Hullbreaker Isle
      { fn: instancedContent, args: [instances.find(instance => instance.id === 23)] }
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
    166: [
      // Saint Mocianne's Arboretum
      { fn: instancedContent, args: [instances.find(instance => instance.id === 41)] }
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
    197: [
      // The Aquapolis
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55001)] }
    ],
    216: [
      // Xelphatol
      { fn: instancedContent, args: [instances.find(instance => instance.id === 46)] }
    ],
    226: [
      // Baelsar's Wall
      { fn: instancedContent, args: [instances.find(instance => instance.id === 48)] }
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
    269: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    272: [
      // The Drowned City of Skalla
      { fn: instancedContent, args: [instances.find(instance => instance.id === 58)] }
    ],
    279: [
      // Hell's Lid
      { fn: instancedContent, args: [instances.find(instance => instance.id === 59)] }
    ],
    289: [
      // The Hidden Canals of Uznair
      { fn: instancedContent, args: [instances.find(instance => instance.id === 55003)] }
    ],
    290: [
      // The Swallow's Compass
      { fn: instancedContent, args: [instances.find(instance => instance.id === 61)] }
    ],
    312: [
      // Saint Mociannes Arboretum (Hard)
      { fn: instancedContent, args: [instances.find(instance => instance.id === 62)] }
    ]
  },
  mounts: {
    8: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    25: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Legacy (1.0)']] },
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    54: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Heavensward']] }
    ],
    111: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
    ],
    121: [
      // Ala Mhigo
      { fn: instancedContent, args: [instances.find(instance => instance.id === 56)] }
    ]
  }
};

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