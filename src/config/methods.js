const helper = require('../xivapi/helper');

const itemActionTypesQuery = (prefix) => [
  { match: { [`${prefix ? `${prefix}.` : ''}ItemAction.Type`]: 853 } }, // Minions
  { match: { [`${prefix ? `${prefix}.` : ''}ItemAction.Type`]: 1013 } }, // Barding
  { match: { [`${prefix ? `${prefix}.` : ''}ItemAction.Type`]: 1322 } }, // Mounts
  { match: { [`${prefix ? `${prefix}.` : ''}ItemAction.Type`]: 5845 } }, // Orchestrion rolls
  { // Emotes are a bit more complicated.
    bool: {
      must: [{
        range: {
          [`${prefix ? `${prefix}.` : ''}ItemAction.Data1`]: { gte: 5100, lte: 5300 }
        }
      }, {
        range: { [`${prefix ? `${prefix}.` : ''}ItemAction.Data2`]: { gt: 0 } }
      }]
    }
  }
];

const questItemIDFields = [
  'ItemReward00',
  'ItemReward01',
  'ItemReward02',
  'ItemReward03',
  'ItemReward04',
  'ItemReward05'
];

const recipeIngredientMax = 10;

module.exports = {
  items: {
    /**
     * For items we need to extract the following fields:
     * `Description_{lang}` - Localised description;
     * `Icon` - Icon path for the sprite sheet;
     * `ID` - The item's ID;
     * `IsUntradable` - Whether the item is untradable;
     * `ItemAction` - Used to determine what the item can be used to obtain;
     * `Name_{lang}` - Localised name;
     * `Pural_{lang}` - Localised plural name.
     */
    columns: [
      ...helper.localisedColumnProperty('Description'),
      'Icon',
      'ID',
      'IsUntradable',
      'ItemAction',
      ...helper.localisedColumnProperty('Name'),
      ...helper.localisedColumnProperty('Plural')
    ],
    indexes: 'item',
    log: 'Items',
    name: 'search',
    query: itemActionTypesQuery()
  },
  quests: {
    /**
     * For quests we need to extract the following fields:
     * `ClassJobLevel0` - The quest's level;
     * `ItemReward{00...n}` - Item ID fields defined in `questItemIDFields`;
     * `JournalGenre` - The quest's Journal entry;
     * `Name_{lang}` - Localised name;
     */
    columns: [
      'ClassJobLevel0',
      ...questItemIDFields,
      'JournalGenre',
      ...helper.localisedColumnProperty('Name'),
    ],
    indexes: 'quest',
    log: 'Quests',
    name: 'search',
    query: questItemIDFields.map(idField => ({
      range: { [idField]: { gt: 0 }}
    })),
    questItemIDFields
  },
  recipes: {
    /**
     * For recipes we need to extract the following fields:
     * `AmountIngredient0...9` - The required amount of each indexed ingredient;
     * `ClassJob` - The crafter's class's...
     *   `Name_{lang}` - Localised name.
     * `ItemIngredient0...9` - Each indexed ingredient's...
     *   `Icon` - Icon path for the sprite sheet;
     *   `Name_{lang}` - Localised name;
     *   `Pural_{lang}` - Localised plural name.
     * `ItemResult` - The item which gets crafted's...
     *   `ItemAction` - Used to determine what the item can be used to obtain.
     * `RecipeLevelTable` - The recipe detail for...
     *   `ClassJobLevel` - The required crafting class level;
     *   `Stars` - The stars associated with the recipe.
     */
    columns: [
      ...(new Array(recipeIngredientMax).fill(1).reduce((arr, _, index) => ([
        ...arr,
        `AmountIngredient${index}`,
        `ItemIngredient${index}.Icon`,
        ...helper.localisedColumnProperty(`ItemIngredient${index}.Name`),
        ...helper.localisedColumnProperty(`ItemIngredient${index}.Plural`)
      ]), [])),
      ...helper.localisedColumnProperty(`ClassJob.Name`),
      'ItemResult.ItemAction',
      'RecipeLevelTable.ClassJobLevel',
      'RecipeLevelTable.Stars'
    ],
    indexes: 'recipe',
    log: 'Recipes',
    recipeIngredientMax,
    name: 'search',
    query: itemActionTypesQuery('ItemResult')
  }
}