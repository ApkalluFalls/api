const fs = require('fs');
const _keys = require('../config/_keys');
const _localisationHelper = require('../config/_localisationHelper');
const achievements = require('../../docs/en/achievements.json');
const barding = require('../../docs/en/barding.json');
const emotes = require('../../docs/en/emotes.json');
const minions = require('../../docs/en/minions.json');
const mounts = require('../../docs/en/mounts.json');
const orchestrion = require('../../docs/en/orchestrion.json');

const expansions = [{
  [_keys.overview.name]: _localisationHelper.misc['A Realm Reborn'],
  [_keys.overview.patchFirst]: 0,
  [_keys.overview.patchLast]: 18,
  [_keys.overview.rel]: _keys.expansions.aRealmReborn
}, {
  [_keys.overview.name]: _localisationHelper.misc['Heavensward'],
  [_keys.overview.patchFirst]: 19,
  [_keys.overview.patchLast]: 35,
  [_keys.overview.rel]: _keys.expansions.heavensward
}, {
  [_keys.overview.name]: _localisationHelper.misc['Stormblood'],
  [_keys.overview.patchFirst]: 36,
  [_keys.overview.patchLast]: 57,
  [_keys.overview.rel]: _keys.expansions.stormblood
}, {
  [_keys.overview.name]: _localisationHelper.misc['Shadowbringers'],
  [_keys.overview.patchFirst]: 58,
  [_keys.overview.patchLast]: 999,
  [_keys.overview.rel]: _keys.expansions.shadowbringers
}]

/**
 * Return an object of points values categorised by game expansion.
 * @param {Array} achievements - The achievements array.
 */
function getAchievementPointsPerExpansion(achievements) {
  const response = {};

  expansions.forEach(expansion => {
    const expansionAchievements = achievements.filter((
      entry => (
        entry[_keys.lists.patch] >= expansion[_keys.overview.patchFirst]
        && entry[_keys.lists.patch] <= expansion[_keys.overview.patchLast]
      )
    ));

    response[expansion[_keys.overview.rel]] = {
      // The pointsTotal includes everything which doesn't have a limited availability.
      [_keys.overview.pointsTotal]: expansionAchievements.filter((
        achievement => !achievement[_keys.lists.availability]
      )).reduce((points, achievement) => achievement[_keys.lists.points] + points, 0),

      // Only seasonal event achievements.
      [_keys.overview.pointsTotalEvents]: expansionAchievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.contentFilters.event]
      )).reduce((points, achievement) => achievement[_keys.lists.points] + points, 0),

      // Only legacy achievements.
      [_keys.overview.pointsTotalLegacy]: expansionAchievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.contentFilters.legacy]
      )).reduce((points, achievement) => achievement[_keys.lists.points] + points, 0)
    }
  });

  return response;
}

/**
 * Return an array of content IDs which are available in-game right now.
 * @param {Array} content - The content array.
 */
function getAllAvailableIDs(content) {
  return content.filter(entry => {
    if (!entry.m.length) {
      return false;
    }

    return entry.m.find(method => !method[3]);
  }).map(entry => entry[_keys.lists.id]);
}

/**
 * Return an object of IDs categorised by game expansion.
 * @param {Array} content - The content array.
 */
function getIDsPerExpansion(content) {
  const response = {};

  expansions.forEach(expansion => {
    response[expansion[_keys.overview.rel]] = content.filter((
      entry => (
        entry[_keys.lists.patch] >= expansion[_keys.overview.patchFirst]
        && entry[_keys.lists.patch] <= expansion[_keys.overview.patchLast]
      )
    )).map(entry => entry.id)
  });

  return response;
}

/**
 * Return an object of IDs categorised by content filters.
 * @param {Array} content - The content array.
 */
function getAllIDsMatchingContentFilters(content) {
  function getContentMatchingFilter(content, filterKey) {
    return content.filter(entry => {
      return entry.m.find(method => method[3] && method[3][filterKey])
    }).map(entry => entry[_keys.lists.id]);
  }

  const keys = _keys.contentFilters;
  const contentWithMethods = content.filter(entry =>  entry.m.length);
  const response = {};

  // Unknown.
  if (content.length - contentWithMethods.length > 0) {
    response[_keys.overview.availableUnknown] = content.filter((
      entry =>  !entry.m.length
    )).map(entry => entry[_keys.lists.id]);
  }

  // Events.
  const contentFromEvents = getContentMatchingFilter(contentWithMethods, keys.event);
  if (contentFromEvents.length) {
    response[_keys.overview.availableEvent] = contentFromEvents;
  }

  // Legacy.
  const unusedContentFromLegacy = getContentMatchingFilter(contentWithMethods, keys.legacy);
  if (unusedContentFromLegacy.length) {
    response[_keys.overview.availableLegacy] = unusedContentFromLegacy;
  }

  // Promotions.
  const contentFromPromo = getContentMatchingFilter(contentWithMethods, keys.externalPromo);
  if (contentFromPromo.length) {
    response[_keys.overview.availableExternalPromo] = contentFromPromo;
  }

  // Real-world events.
  const contentFromRealWorldEvents = getContentMatchingFilter(contentWithMethods, keys.realWorldEvent);
  if (contentFromRealWorldEvents.length) {
    response[_keys.overview.availableRealWorldEvent] = contentFromRealWorldEvents;
  }

  // Store purchases.
  const contentFromStorePurchase = getContentMatchingFilter(contentWithMethods, keys.storePurchase);
  if (contentFromStorePurchase.length) {
    response[_keys.overview.availableStorePurchase] = contentFromStorePurchase;
  }

  return response;
}

/**
 * Generate total counts and arrays.
 */
module.exports = () => {
  const keys = _keys.overview;

  const parsed = {
    keys: _keys,
    expansions
  };

  if (achievements) {
    parsed.achievements = {
      [keys.total]: achievements.length,
      ...getAchievementPointsPerExpansion(achievements)
    }
  }

  if (barding) {
    parsed.barding = {
      [keys.available]: getAllAvailableIDs(barding),
      ...getAllIDsMatchingContentFilters(barding),
      ...getIDsPerExpansion(barding)
    }
  }

  if (emotes) {
    parsed.emotes = {
      [keys.available]: getAllAvailableIDs(emotes),
      [keys.unlockedByDefault]: emotes.filter((
        emote => emote[_keys.lists.methods] && emote[_keys.lists.methods][0][0] === "byDefault"
      )).map(emote => emote.id),
      ...getAllIDsMatchingContentFilters(emotes),
      ...getIDsPerExpansion(emotes)
    }
  }

  if (minions) {
    parsed.minions = {
      [keys.available]: getAllAvailableIDs(minions),
      ...getAllIDsMatchingContentFilters(minions),
      ...getIDsPerExpansion(minions)
    }
  }

  if (mounts) {
    parsed.mounts = {
      [keys.available]: getAllAvailableIDs(mounts),
      ...getAllIDsMatchingContentFilters(mounts),
      ...getIDsPerExpansion(mounts)
    }
  }

  if (orchestrion) {
    parsed.orchestrion = {
      [keys.total]: orchestrion.length,
      ...getIDsPerExpansion(orchestrion)
    }
  }

  fs.writeFileSync(
    './docs/data.json',
    JSON.stringify(parsed),
    'utf8'
  );
};