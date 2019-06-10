const _localisationHelper = require('../src/config/_localisationHelper');

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
    79: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['A Realm Reborn']] }
    ],
    129: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Heavensward']] }
    ],
    238: [
      { fn: collectorsEdition, args: [_localisationHelper.misc['Stormblood']] }
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