const fs = require('fs');
const _keys = require('../config/_keys');
const _localisationHelper = require('../config/_localisationHelper');

module.exports = (contentType, language = 'en') => {
  const maps = require('../../data/maps.json');
  const npcs = require('../../data/npcs.json');
  const crafting = require('../../data/methods/crafting.json');
  const gathering = require('../../data/methods/gathering.json');
  const quests = require('../../data/methods/quests.json');
  const shops = require('../../data/methods/shops.json');

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
      [keys.methods]: [],
      [keys.name]: entry.name[language] || entry.name.en,
      [keys.patch]: entry.patch
    };

    if (entry.iconLarge) {
      response[keys.iconLarge] = entry.iconLarge;
    }

    // Any additional fields defined by the config.
    config.structure.forEach(key => response[key] = entry[key]);

    if (crafting[contentType]) {
      crafting[contentType].filter(craftingEntry => craftingEntry.contentId === id).forEach(match => {
        response[keys.methods].push(_localisationHelper.craftShort(match, language));
      });
    }

    if (gathering[contentType]) {
      gathering[contentType].filter(gatheringEntry => gatheringEntry.contentId === id).forEach(match => {
        response[keys.methods].push(_localisationHelper.gatherShort(match, language));
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

        response[keys.methods].push(_localisationHelper.quest[type](match, language));
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
          console.warn(`Missing NPC data for Shop entry:`, match, 'Skipping.');
          return;
        }

        const map = maps.find(entry => entry.id === npc.location);

        if (!map) {
          console.warn(`${npc.id} - ${npc.name.en}`);
          return;
        }

        response[keys.methods].push(_localisationHelper.shop[type]({
          ...match,
          map,
          npc
        }, language));
      });
    }

    return response;
  });

  fs.writeFileSync(
    `../docs/${language}/${contentType}.json`,
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.name} list API generated with locale: ${language}.`);
}