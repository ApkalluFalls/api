const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = (data) => {
  const config = require('../config/data').quests;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  data.reduce((arr, quest) => {
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

    const {
      JournalGenre
    } = quest;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    parsed[contentType].push({
      contentId: item.contentId,
      journal: {
        category: helper.getLocalisedNamesObject(JournalGenre.JournalCategory),
        genre: helper.getLocalisedNamesObject(JournalGenre)
      },
      icon: quest.IconID,
      iconPath: quest.Icon,
      level: quest.ClassJobLevel0,
      name: helper.getLocalisedNamesObject(quest)
    })
  });

  fs.writeFileSync(
    '../data/methods/quests.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};