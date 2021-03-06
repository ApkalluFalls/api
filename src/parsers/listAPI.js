const fs = require('fs');
const _keys = require('../config/_keys');
const _localisationHelper = require('../config/_localisationHelper');
const getMethodFromOrchestrionDescription = require('../parsers/orchestrionRollDescriptions');

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
      response[keys.description] = entry.description[language] || entry.description.en;
      response[keys.kind] = entry.kind;
      response[keys.points] = Number(entry.points);

      const { title } = entry;
      if (title) {
        response[keys.title] = {
          [keys.id]: title.id,
          [keys.isPrefix]: title.isPrefix,
          [keys.name]: title.name[language],
          [keys.nameFemale]: title.nameFemale[language]
        };
      }
      
      const availability = config.getAvailability(entry);
      if (availability && Object.keys(availability).length) {
        response[keys.availability] = availability;
      }
    } else if (contentType === 'orchestrion') {
      response[keys.category] = entry.category;
      response[keys.methods] = parseMethodDataFiles(id, contentType, language, entry);
      response[keys.order] = entry.order;
    } else {
      response[keys.methods] = parseMethodDataFiles(id, contentType, language, entry);
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
 * @param {String} contentData- The content's data returned from the API.
 */
function parseMethodDataFiles(id, contentType, language, contentData) {
  const methods = [];

  const maps = require('../../data/maps.json');
  const npcs = require('../../data/npcs.json');
  const achievements = require('../../data/content/achievements.json');
  const achievementMapping = require('../../data/methods/achievements.json');
  const crafting = require('../../data/methods/crafting.json');
  const gathering = require('../../data/methods/gathering.json');
  const quests = require('../../data/methods/quests.json');
  const shops = require('../../data/methods/shops.json');

  const extensions = (require(`../../extensions/obtain-methods`))[contentType] || {};
  const fateLocations = require('../../extensions/fate-locations');

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
      
      let extra;
      let type;

      if (icon === 71201) {
        type = 'msqShort';
      } else if (icon === 71221) {
        type = 'questShort';
      } else {
        extra = {
          event: true
        }
        type = 'eventQuestShort';
      }

      methods.push(_localisationHelper.quest[type](match, language, extra));
    });
  }

  if (shops[contentType]) {
    shops[contentType].filter(shopEntry => shopEntry.contentId === id).forEach(match => {
      // If it's a BNPC entry, we simply find the associated FATE location and return that.
      if (match.bNPC) {
        const fateId = match.fate.id;
        const fateLocationInfo = fateLocations[fateId];

        if (!fateLocationInfo) {
          console.warn(`An extension is required for FATE ${fateId}'s location. Skipping.`);
          return;
        }

        const map = maps.find(map => map.id === fateLocationInfo.location);
      
        if (!map) {
          console.warn(`FATE ${fateId}'s extension is pointing to an invalid location. Skipping.`);
          return;
        }

        methods.push(_localisationHelper.shop.gilAfterFateShort({
          ...match,
          map,
          x: fateLocationInfo.x,
          y: fateLocationInfo.y
        }, language));
        return;
      }

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
          console.warn(`Missing map data for NPC ${npc.id} ${npc.name.en}. Override can be added to /extensions/npc-locations.js. Skipping.`);
        }
        return;
      }

      methods.push(_localisationHelper.shop[type]({
        ...match,
        map,
        npc
      }, language));
    });

    // If the content has any extensions, add them to the methods array.
    const extension = extensions[id];
    if (extension) {
      if (!Array.isArray(extension)) {
        throw new Error(`Expected extension for ${contentType} ${id} to be an array.`);
      }

      extension.forEach(method => {
        const {
          fn,
          args,
          filters
        } = method;
  
        if (typeof fn !== 'function') {
          throw new Error(`An obtain method extension for ${contentType} ${id} is missing a 'fn' function.`);
        }
  
        if (!Array.isArray(args)) {
          throw new Error(`An obtain method extension for ${contentType} ${id} is missing an 'args' array.`);
        }

        const obtainMethod = fn(id, ...args, language);

        if (filters) {
          if (obtainMethod[3]) {
            obtainMethod[3] = {
              ...obtainMethod[3],
              ...filters
            }
          } else {
            obtainMethod[3] = filters;
          }
        }

        if (obtainMethod) {
          methods.push(obtainMethod);
        }
      })
    }
  }

  if (!methods.length) {
    switch (contentType) {
      // Some Emotes are unlocked initially, so we can mark those as such.
      case 'emotes': {
        if (contentData.link === 0 || contentData.link === 340) {
          methods.push(_localisationHelper.defaultShort({
            id
          }, language));
        }
        break;
      }

      // Orchestrions have descriptions in-game which can be used by default.
      case 'orchestrion': {
        const extractedMethods = getMethodFromOrchestrionDescription(contentData, language);

        if (extractedMethods) {
          extractedMethods.forEach(extractedMethod => methods.push(extractedMethod));
        } else {
          if (language === 'en') {
            console.warn(`Defaulting method for orchestrion roll ${id}: ${contentData.description.en}`);
          }

          methods.push(_localisationHelper.genericShort({
            id,
            text: contentData.description
          }, language));
        }
        break;
      }
    }
  }

  if (language === 'en' && !methods.length) {
    console.warn(`No known obtain methods for ${contentType} ${id}: ${contentData.name.en}`);
    global.missingObtainMethods += 1;
  }

  return methods;
}