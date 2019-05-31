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

const fishingSpotItemIDFields = [
  'Item0TargetID',
  'Item1TargetID',
  'Item2TargetID',
  'Item3TargetID',
  'Item4TargetID',
  'Item5TargetID',
  'Item6TargetID',
  'Item7TargetID',
  'Item8TargetID',
  'Item9TargetID'
];

const gatheringItemIDFields = [
  'Item0',
  'Item1',
  'Item2',
  'Item3',
  'Item4',
  'Item5',
  'Item6',
  'Item7'
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
  currencies: {
    /**
     * For currencies we need to extract the following fields...
     * `ID` - The currency's ID;
     * `Icon` - Icon path for the sprite sheet;
     * `IconID` - Icon ID to pull from the sprite sheet;
     * `Name_{lang}` - Localised name;
     * `Pural_{lang}` - Localised plural name.
     */
    columns: [
      'ID',
      'Icon',
      'IconID',
      ...helper.localisedColumnProperty(`Name`),
      ...helper.localisedColumnProperty(`Plural`)
    ],
    indexes: 'item',
    isPaginated: true,
    log: 'Currencies',
    method: 'search',
    query: [{
      "range": {
        "IconID": {
          "gte": 65000,
          "lt": 66000
        }
      }
    }],
    queryType: 'must'
  },
  gathering: {
    fishingSpots: {
      /**
       * For fishing spots we need to extract the following fields:
       * `GatheringLevel` - The fishing node's level;
       * `Item{0...n}TargetID` - Items attached to the fishing node;
       * `TerritoryType` - The world map's...
       *   `PlaceName` - Region.
       */
      columns: [
        'GatheringLevel',
        ...fishingSpotItemIDFields,
        'TerritoryType.PlaceName'
      ],
      fishingSpotItemIDFields,
      isPaginated: true,
      log: 'Fishing Spots',
      method: 'fetch',
      name: 'fishingSpots'
    },
    items: {
      /**
       * For gathering items we need to extract the following fields:
       * `ID` - Used to point to the relevant Gathering Point;
       * `IsHidden` - Whether the item is hidden by default;
       * `Item` - Used to point to the relevant Item.
       */
      columns: [
        'ID',
        'IsHidden',
        'Item'
      ],
      isPaginated: true,
      log: 'Gathering Items',
      method: 'fetch',
      name: 'gatheringItems'
    },
    points: {
      /**
       * For gathering points we need to extract the following fields:
       * `GatheringPointBase` - The gathering point's...
       *   `GatheringLevel` - Level;
       *   `GatheringType` - Node details;
       *   `Item{0...n}` - Gathering item reference (gathering item =/= item).
       * `TerritoryType` - The world map's...
       *   `PlaceName` - Region.
       */
      columns: [
        'GatheringPointBase.GatheringLevel',
        'GatheringPointBase.GatheringType',
        ...gatheringItemIDFields.map(field => `GatheringPointBase.${field}`),
        'TerritoryType.PlaceName',
        'ID'
      ],
      gatheringItemIDFields,
      isPaginated: true,
      log: 'Gathering Points',
      method: 'fetch',
      name: 'gatheringPoints'
    },
    spearFishingItems: {
      /**
       * For spear fishing items we need to extract the following fields:
       * `GatheringItemLevel` - The fishing node's level object;
       * `IsVisible` - Whether the node is visible by default;
       * `ItemTargetID` - The item's ID used to link the result to the items data set;
       * `TerritoryType` - The world map's...
       *   `PlaceName` - Region.
       */
      columns: [
        'GatheringItemLevel',
        'IsVisible',
        'ItemTargetID',
        'TerritoryType.PlaceName'
      ],
      isPaginated: true,
      log: 'Spear Fishing Items',
      method: 'fetch',
      name: 'spearfishingItems'
    },
    types: {
      /**
       * For gathering types we fetch all data for the sake of fishing entries.
       * Fishing is only listed as spear fishing (ID: 4) and it's only translated into Japanese, so
       * the parser needs to work to rectify it.
       */
      columns: [
        'IconMain',
        'IconMainID',
        'ID'
      ],
      isPaginated: true,
      log: 'Gathering Types (for Fishing)',
      method: 'fetch',
      name: 'gatheringTypes'
    }
  },
  items: {
    /**
     * For items we need to extract the following fields:
     * `Description_{lang}` - Localised description;
     * `Icon` - Icon path for the sprite sheet;
     * `IconID` - Icon ID to pull from the sprite sheet;
     * `ID` - The item's ID;
     * `IsUntradable` - Whether the item is untradable;
     * `ItemAction` - Used to determine what the item can be used to obtain;
     * `Name_{lang}` - Localised name;
     * `Pural_{lang}` - Localised plural name.
     */
    columns: [
      ...helper.localisedColumnProperty('Description'),
      'Icon',
      'IconID',
      'ID',
      'IsUntradable',
      'ItemAction',
      ...helper.localisedColumnProperty('Name'),
      ...helper.localisedColumnProperty('Plural')
    ],
    indexes: 'item',
    log: 'Items',
    method: 'search',
    query: itemActionTypesQuery()
  },
  quests: {
    /**
     * For quests we need to extract the following fields:
     * `ClassJobLevel0` - The quest's level;
     * `Icon` - Icon path for the sprite sheet;
     * `IconID` - Icon ID to pull from the sprite sheet;
     * `ItemReward{00...n}` - Item ID fields defined in `questItemIDFields`;
     * `JournalGenre` - The quest's Journal entry;
     * `Name_{lang}` - Localised name;
     */
    columns: [
      'ClassJobLevel0',
      ...questItemIDFields,
      'Icon',
      'IconID',
      'JournalGenre',
      ...helper.localisedColumnProperty('Name'),
    ],
    indexes: 'quest',
    log: 'Quests',
    method: 'search',
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
     *   `IconID` - Icon ID to pull from the sprite sheet;
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
    log: 'Recipes',
    recipeIngredientMax,
    method: 'search',
    query: itemActionTypesQuery('ItemResult')
  }
}