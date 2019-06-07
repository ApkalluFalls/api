const fs = require('fs');
const _keys = require('../config/_keys');
const _localisationHelper = require('../config/_localisationHelper');

/**
 * Create content lists with base data and short obtain method strings.
 * @param {String} contentType - The type of content (e.g. `"mounts"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
module.exports = (contentType, language = 'en') => {
  const content = require(`../../data/content/${contentType}.json`);
  const config = require(`../config/${contentType}`).list;
  const keys = _keys.lists;

  const parsed = content.map(entry => {
    const {
      id
    } = entry;

    const response = {
      [keys.icon]: entry.icon,
      [keys.id]: id,
      [keys.name]: entry.name[language] || entry.name.en,
      [keys.patch]: entry.patch
    };

    if (entry.iconLarge) {
      response[keys.iconLarge] = entry.iconLarge;
    }

    // Any additional fields defined by the config.
    config.structure.forEach(key => response[keys[key]] = entry[key]);

    if (contentType === 'achievements') {
      response[keys.category] = entry.category;
      response[keys.description] = entry.description.en;
      response[keys.kind] = entry.kind;
    } else if (contentType === 'orchestrion') {
      response[keys.category] = entry.category;
      response[keys.description] = entry.description.en;
      response[keys.methods] = parseMethodDataFiles(id, contentType, language);
      response[keys.order] = entry.order;
    } else {
      response[keys.methods] = parseMethodDataFiles(id, contentType, language);
    }

    if (response.undefined && language === 'en') {
      // A reminder to add any missing keys to the _keys.js configuration.
      console.error(`Unknown key exists with value passed in as ${response.undefined}.`);
    }

    return response;
  });

  fs.writeFileSync(
    `./docs/${language}/${contentType}.json`,
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.name} list API generated with locale: ${language}.`);
}

/**
 * Parse data from data/methods/*.json files for obtain methods related to the content.
 * @param {Number} id - The content's unique identifier
 * @param {String} contentType - The type of content (e.g. `"mounts"`)
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
function parseMethodDataFiles(id, contentType, language) {
  const methods = [];

  const maps = require('../../data/maps.json');
  const npcs = require('../../data/npcs.json');
  const achievements = require('../../data/content/achievements.json');
  const achievementMapping = require('../../data/methods/achievements.json');
  const crafting = require('../../data/methods/crafting.json');
  const gathering = require('../../data/methods/gathering.json');
  const quests = require('../../data/methods/quests.json');
  const shops = require('../../data/methods/shops.json');

  if (achievementMapping[contentType]) {
    achievementMapping[contentType].filter(achievement => achievement.contentId === id).forEach(match => {
      const achievement = achievements.find(achievement => achievement.id === match.achievement);
      methods.push(_localisationHelper.achievementShort({
        contentId: match.contentId,
        ...achievement
      }, language));
    });
  }

  if (crafting[contentType]) {
    crafting[contentType].filter(craftingEntry => craftingEntry.contentId === id).forEach(match => {
      let icon;

      switch (match.icon) {
        case 'alchemist':
          icon = 'c1';
          break;
        case 'armorer':
          icon = 'c2';
          break;
        case 'blacksmith':
          icon = 'c3';
          break;
        case 'carpenter':
          icon = 'c4';
          break;
        case 'culinarian':
          icon = 'c5';
          break;
        case 'goldsmith':
          icon = 'c6';
          break;
        case 'leatherworker':
          icon = 'c7';
          break;
        case 'weaver':
          icon = 'c8';
          break;
        default:
          console.warn(`Unrecognised crafting class icon ref '${match.icon}'. Skipping.`)
          return;
      }

      methods.push(_localisationHelper.craftShort({
        ...match,
        icon
      }, language));
    });
  }

  if (gathering[contentType]) {
    gathering[contentType].filter(gatheringEntry => gatheringEntry.contentId === id).forEach(match => {
      let icon;

      switch (match.icon) {
        case 60438: // Miner
          icon = 'g1';
          break;
        case 60432: // Botanist
          icon = 'g2';
          break;
        case 60929: // Fisher
          icon = 'g3';
          break;
        default:
          console.warn(`Unrecognised gathering class icon ref '${match.icon}'. Skipping.`)
          return;
      }

      methods.push(_localisationHelper.gatherShort({
        ...match,
        icon
      }, language));
    });
  }

  if (quests[contentType]) {
    quests[contentType].filter(questEntry => questEntry.contentId === id).forEach(match => {
      const {
        icon
      } = match;
      
      let type;

      if (icon === 71201) {
        type = 'msqShort';
      } else if (icon === 71221) {
        type = 'questShort';
      } else {
        type = 'eventQuestShort';
      }

      methods.push(_localisationHelper.quest[type](match, language));
    });
  }

  if (shops[contentType]) {
    shops[contentType].filter(shopEntry => shopEntry.contentId === id).forEach(match => {
      const npc = npcs.find(entry => entry.id === match.npc);

      const {
        en
      } = match.currency.name;
      
      let type;

      if (en === 'Gil') {
        type = 'gilShort';
      } else {
        type = 'specialShort';
      }

      if (!npc) {
        if (language === 'en') {
          console.warn(`Missing NPC data for Shop entry:`, match, 'Skipping.');
        }
        return;
      }

      const map = maps.find(entry => entry.id === npc.location);

      if (!map) {
        if (language === 'en') {
          console.warn(`Missing map data for NPC ${npc.id} ${npc.name.en}. Override can be added to /extensions/npc.js. Skipping.`);
        }
        return;
      }

      methods.push(_localisationHelper.shop[type]({
        ...match,
        map,
        npc
      }, language));
    });
  }

  return methods;
}