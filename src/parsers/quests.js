const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Return the parsed quest object.
 * @param {Number} contentId - The matching content ID.
 * @param {Object} quest - The quest object.
 */
function getParsedQuestObject(contentId, quest) {
  const {
    JournalGenre
  } = quest;

  return {
    contentId: contentId,
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
  const parsed = {};

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
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    parsed[contentType].push(getParsedQuestObject(item.contentId, quest))
  });

  // Quests with scripts (auto-awarded content without needing an item).
  const instructionFields = new Array(config.questScriptArgs).fill(1).map((_, index) => (
    `ScriptInstruction${index}`
  ));

  const scriptInstructions = [{
    contentType: 'emotes',
    instruction: 'EMOTE0'
  }, {
    contentType: 'mounts',
    instruction: 'MOUNT0'
  }, {
    contentType: 'minions',
    instruction: 'COMPANION0'
  }]

  data.forEach(quest => {
    instructionFields.forEach((instructionField, index) => {
      scriptInstructions.forEach(scriptInstruction => {
        if (quest[instructionField] === scriptInstruction.instruction) {
          if (!parsed[scriptInstruction.contentType]) {
            parsed[scriptInstruction.contentType] = [];
          }

          console.warn(quest[instructionField], quest[`ScriptArg${index}`], quest.ID, quest.Name_en);
          
          parsed[scriptInstruction.contentType].push((
            getParsedQuestObject(quest[`ScriptArg${index}`], quest)
          ));
        }
      })
    })
  })

  fs.writeFileSync(
    './data/methods/quests.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};