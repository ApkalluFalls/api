const fs = require('fs');
const helper = require('../xivapi/helper');
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
  const parsed = {};

  if (achievements) {
    parsed.achievements = {
      total: achievements.length,
      pointsTotal: achievements.reduce((points, achievement) => achievement.x += points, 0)
    }
  }

  if (barding) {
    parsed.barding = {
      total: barding.length
    }
  }

  if (emotes) {
    parsed.emotes = {
      total: emotes.length
    }
  }

  if (minions) {
    parsed.minions = {
      total: minions.length
    }
  }

  if (mounts) {
    parsed.mounts = {
      total: mounts.length
    }
  }

  if (orchestrion) {
    parsed.orchestrion = {
      total: orchestrion.length
    }
  }

  fs.writeFileSync(
    './docs/data.json',
    JSON.stringify(parsed),
    'utf8'
  );
};