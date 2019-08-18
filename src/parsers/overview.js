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
 * Parse recipe data from XIVAPI.
 */
module.exports = () => {
  const keys = _keys.overview;

  const parsed = {};

  if (achievements) {
    parsed.achievements = {
      [keys.total]: achievements.length,

      // The pointsTotal includes everything which doesn't have a limited availability.
      [keys.pointsTotal]: achievements.filter((
        achievement => !achievement[_keys.lists.availability]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0),

      // Only seasonal event achievements.
      [keys.pointsTotalEvents]: achievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.achievementAvailability.event]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0),

      // Only legacy achievements.
      [keys.pointsTotalLegacy]: achievements.filter((
        achievement => achievement[_keys.lists.availability] && achievement[_keys.lists.availability][_keys.achievementAvailability.legacy]
      )).reduce((points, achievement) => achievement[_keys.lists.points] += points, 0)
    }
  }

  if (barding) {
    parsed.barding = {
      [keys.total]: barding.length
    }
  }

  if (emotes) {
    parsed.emotes = {
      [keys.total]: emotes.length
    }
  }

  if (minions) {
    parsed.minions = {
      [keys.total]: minions.length
    }
  }

  if (mounts) {
    parsed.mounts = {
      [keys.total]: mounts.length
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