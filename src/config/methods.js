const helper = require('../xivapi/helper');

const itemActionTypesQuery = [
  { match: { 'ItemResult.ItemAction.Type': 853 } }, // Minions
  { match: { 'ItemResult.ItemAction.Type': 1013 } }, // Barding
  { match: { 'ItemResult.ItemAction.Type': 1322 } }, // Mounts
  { match: { 'ItemResult.ItemAction.Type': 5845 } }, // Orchestrion rolls
  { // Emotes are a bit more complicated.
    bool: {
      must: [{
        range: {
          'ItemResult.ItemAction.Type': { gte: 5100, lte: 5300 }
        }
      }, {
        range: { 'ItemResult.ItemAction.Data0': { gt: 0 } }
      }]
    }
  }
];

const ingredientMax = 10;

module.exports = {
  recipes: {
    /**
     * For recipes we need to extract the following fields:
     * `AmountIngredient0...9` - The required amount of each indexed ingredient.
     * `ClassJob` - The crafter's class's...
     *   `Name_{lang}` - Localised name.
     * `ItemIngredient0...9` - Each indexed ingredient's...
     *   `IconID` - Icon ID for the sprite sheet;
     *   `Name_{lang}` - Localised name;
     *   `Pural_{lang}` - Localised plural name.
     * `ItemResult` - The item which gets crafted's...
     *   `ItemAction` - Used to determine what the item can be used to obtain.
     * `RecipeLevelTable` - The recipe detail for...
     *   `ClassJobLevel` - The required crafting class level;
     *   `Stars` - The stars associated with the recipe.
     */
    columns: [
      ...(new Array(ingredientMax).fill(1).reduce((arr, _, index) => ([
        ...arr,
        `AmountIngredient${index}`,
        `ItemIngredient${index}.IconID`,
        ...helper.localisedColumnProperty(`ItemIngredient${index}.Name`),
        ...helper.localisedColumnProperty(`ItemIngredient${index}.Plural`)
      ]), [])),
      ...helper.localisedColumnProperty(`ClassJob.Name`),
      'ItemResult.ItemAction',
      'RecipeLevelTable.ClassJobLevel',
      'RecipeLevelTable.Stars'
    ],
    indexes: 'recipe',
    ingredientMax,
    query: itemActionTypesQuery,
    name: 'search'
  }
}