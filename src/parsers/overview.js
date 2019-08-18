const fs = require('fs');
const helper = require('../xivapi/helper');
const _keys = require('../config/_keys');
const achievements = require('../../docs/en/achievements.json');
const barding = require('../../docs/en/barding.json');
const emotes = require('../../docs/en/emotes.json');
const minions = require('../../docs/en/minions.json');
const mounts = require('../../docs/en/mounts.json');
const orchestrion = require('../../docs/en/orchestrion.json');

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
    keys: _keys
  };

  if (achievements) {
    parsed.achievements = {
      [keys.total]: achievements.length,

      // The pointsTotal includes everything which doesn't have a limited availability.
      [keys.pointsTotal]: achievements.filter((
        achievement => !achievement[_keys.lists.availability]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0),

      // Only seasonal event achievements.
      [keys.pointsTotalEvents]: achievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.contentFilters.event]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0),

      // Only legacy achievements.
      [keys.pointsTotalLegacy]: achievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.contentFilters.legacy]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0)
    }
  }

  if (barding) {
    parsed.barding = {
      [keys.available]: getAllAvailableIDs(barding),
      ...getAllIDsMatchingContentFilters(barding)
    }
  }

  if (emotes) {
    parsed.emotes = {
      [keys.available]: getAllAvailableIDs(emotes),
      ...getAllIDsMatchingContentFilters(emotes)
    }
  }

  if (minions) {
    parsed.minions = {
      [keys.available]: getAllAvailableIDs(minions),
      ...getAllIDsMatchingContentFilters(minions)
    }
  }

  if (mounts) {
    parsed.mounts = {
      [keys.available]: getAllAvailableIDs(mounts),
      ...getAllIDsMatchingContentFilters(mounts)
    }
  }

  if (orchestrion) {
    parsed.orchestrion = {
      [keys.total]: orchestrion.length
    }
  }

  fs.writeFileSync(
    './docs/data.json',
    JSON.stringify(parsed),
    'utf8'
  );
};