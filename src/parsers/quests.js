const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Return the parsed quest object.
 * @param {Object} quest - The quest object.
 */
function getParsedQuestObject(quest) {
  const {
    JournalGenre
  } = quest;

  return {
    journal: {
      category: helper.getLocalisedNamesObject(JournalGenre.JournalCategory),
      genre: helper.getLocalisedNamesObject(JournalGenre)
    },
    icon: quest.IconID,
    iconPath: quest.Icon,
    level: quest.ClassJobLevel0,
    name: helper.getLocalisedNamesObject(quest),
    quest: quest.ID
  };
}

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = (data) => {
  const config = require('../config/data').quests;
  const methods = {};
  const parsed = [];

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  // Quests with items.
  data.filter(quest => {
    for (const field of config.questItemIDFields) {
      if (quest[field] > 0) {
        return true;
      }
    }

    return false;
  }).reduce((arr, quest) => {
    let items = [];

    config.questItemIDFields.forEach(key => {
      items = [
        ...items,
        ...allItems.filter(item => item.id === quest[key])
      ]
    });

    return [
      ...arr,
      ...items.map(item => ({
        item,
        quest
      }))
    ];
  }, []).forEach(entry => {
    const {
      item,
      quest
    } = entry;

    const {
      contentType
    } = item;
    
    if (!methods[contentType]) {
      methods[contentType] = [];
    }

    methods[contentType].push({
      contentId: item.contentId,
      ...getParsedQuestObject(quest)
    });
  });

  fs.writeFileSync(
    './data/methods/quests.json',
    JSON.stringify(methods),
    'utf8'
  );

  data.filter(quest => {
    return quest.Name_en && quest.JournalGenre;
  }).forEach(quest => {
    parsed.push(getParsedQuestObject(quest));
  });

  fs.writeFileSync(
    './data/quests.json',
    JSON.stringify(parsed),
    'utf8'
  );

  console.info(`${config.log} data parsed.`);
};