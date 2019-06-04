const helper = require('../xivapi/helper');
const fs = require('fs');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = (data) => {
  const config = require('../config/data').recipes;
  const parsed = {};

  data.forEach(entry => {
    const {
      id,
      type
    } = helper.getContentFromItemActions(entry.ItemResult.ItemAction);
    

    if (!parsed[type]) {
      parsed[type] = [];
    }

    const {
      ClassJob
    } = entry;

    parsed[type].push({
      contentId: id,
      icon: ClassJob.Icon.replace(/^.*\/([A-Za-z0-9]+)\.png$/, (_, group) => {
        return group;
      }),
      iconPath: ClassJob.Icon,
      items: new Array(config.recipeIngredientMax).fill(1).reduce((arr, _, index) => {
        const amount = Number(entry[`AmountIngredient${index}`]);
        
        if (amount <= 0) {
          return arr;
        }

        const ingredient = entry[`ItemIngredient${index}`];

        return [
          ...arr,
          {
            amount,
            icon: ingredient.IconID,
            iconPath: ingredient.Icon,
            name: helper.getLocalisedNamesObject(ingredient, undefined, amount)
          }
        ];
      }, []),
      job: {
        level: entry.RecipeLevelTable.ClassJobLevel,
        name: helper.getLocalisedNamesObject(ClassJob),
        stars: entry.RecipeLevelTable.Stars
      }
    })
  });

  fs.writeFileSync(
    '../data/methods/crafting.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};