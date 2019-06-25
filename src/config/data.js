const helper = require('../xivapi/helper');
const itemsForExchange = require('../../extensions/items-for-exchange');

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
  },
  // Misc items.
  ...itemsForExchange.map(itemForExchange => ({ match: { 'ID': itemForExchange }}))
];

const customTalkScriptArgs = 30;
const eNPCBaseDataRefs = 32;

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

const specialShopItemIndexes = [
  "00","01","10","11","20","21","30","31","40","41","50","51","60","61","70","71","80","81","90",
  "91","100","101","110","111","120","121","130","131","140","141","150","151","160","161","170",
  "171","180","181","190","191","200","201","210","211","220","221","230","231","240","241","250",
  "251","260","261","270","271","280","281","290","291","300","301","310","311","320","321","330",
  "331","340","341","350","351","360","361","370","371","380","381","390","391","400","401","410",
  "411","420","421","430","431","440","441","450","451","460","461","470","471","480","481","490",
  "491","500","501","510","511","520","521","530","531","540","541","550","551","560","561","570",
  "571","580","581","590","591"
];

module.exports = {
  currencies: {
    /**
     * For currencies we need to extract the following fields...
     * `Icon` - Icon path for the sprite sheet;
     * `IconID` - Icon ID to pull from the sprite sheet;
     * `ID` - The currency's ID;
     * `Name_{lang}` - Localised name;
     * `Pural_{lang}` - Localised plural name.
     */
    columns: [
      'Icon',
      'IconID',
      'ID',
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
  customTalk: {
    /**
     * For custom talk entries we need to extract the following fields...
     * `ID` - The custom talk entry's ID;
     * `ScriptArg{0...n}` - Script arguments which contain references to other content.
     */
    columns: [
      'ID',
      ...new Array(customTalkScriptArgs).fill(1).map((_, index) => `ScriptArg${index}`)
    ],
    customTalkScriptArgs,
    isPaginated: true,
    log: 'Custom Talk entries',
    method: 'fetch',
    name: 'customTalk'
  },
  fates: {
    /**
     * For FATEs we need to extract the following fields:
     * `ClassJobLevel` - The required level;
     * `ID` - To link other content to a given FATE;
     * `Name_{lang}` - Localised name.
     */
    columns: [
      'ClassJobLevel',
      'ID',
      ...helper.localisedColumnProperty('Name')
    ],
    isPaginated: true,
    log: 'FATEs',
    method: 'fetch',
    name: 'fates'
  },
  gathering: {
    fishingSpots: {
      /**
       * For fishing spots we need to extract the following fields:
       * `GatheringLevel` - The fishing node's level;
       * `Item{0...n}TargetID` - Items attached to the fishing node;
       * `TerritoryType` - The world map's...
       *   `ID` - Territory ID used to link through to map data.
       */
      columns: [
        'GatheringLevel',
        ...fishingSpotItemIDFields,
        'TerritoryType.ID'
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
       *   `ID` - Territory ID used to link through to map data.
       */
      columns: [
        'GatheringPointBase.GatheringLevel',
        'GatheringPointBase.GatheringType',
        ...gatheringItemIDFields.map(field => `GatheringPointBase.${field}`),
        'ID',
        'TerritoryType.ID'
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
       *   `ID` - Territory ID used to link through to map data.
       */
      columns: [
        'GatheringItemLevel',
        'IsVisible',
        'ItemTargetID',
        'TerritoryType.ID'
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
  instances: {
    /**
     * For instances we need to extract the following fields:
     * `ContentFinderCondition` - Object containing the instance's level;
     * `ContentType` - Object containing the instance's type;
     * `ID` - The ID used to reference the extracted data in future;
     * `Name_{lang}` - Localised name;
     */
    columns: [
      'ContentFinderCondition',
      'ContentType',
      'ID',
      ...helper.localisedColumnProperty('Name')
    ],
    isPaginated: true,
    log: 'Instances',
    method: 'fetch',
    name: 'instanceContent'
  },
  items: {
    cache: 'items',
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
  maps: {
    /**
     * For maps we need to extract the following fields:
     * `ID` - To link other content to a given map;
     * `PlaceName` - The name of the exact map area's...
     *   `Name_{lang}` - Localised name;
     * `PlaceNameRegion` - The region the map area belongs to's...
     *   `Name_{lang}` - Localised name.
     */
    columns: [
      'ID',
      ...helper.localisedColumnProperty('PlaceName.Name'),
      ...helper.localisedColumnProperty('PlaceNameRegion.Name')
    ],
    isPaginated: true,
    log: 'Map Areas',
    method: 'fetch',
    name: 'territoryTypes'
  },
  npcs: {
    cacheAs: 'npc-names',
    columns: [
      'ID',
      ...helper.localisedColumnProperty('Name')
    ],
    /**
     * Filter out any data sets which:
     * 1. Have no English name.
     */
    filter: (data) => {
      return data.filter(eNPCResident => eNPCResident.Name_en);
    },
    isPaginated: true,
    log: 'ENPCResidents (for NPCs)',
    method: 'fetch',
    name: 'eNPCResident',
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
     *   `Icon` - Icon;
     *   `ID` - ID used to map to the icon;
     *   `Name_{lang}` - Localised name;
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
      'ClassJob.ID',
      'ClassJob.Icon',
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
  },
  retainerVentures: {
    log: 'Retainer Ventures',
    data: {
      /**
      * For retainer venture data entries we need to extract the following fields:
      * `ID` - The content's identifier;
      * `IsRandom` - Used to filter the data to only include random entries;
      * `RetainerLevel` - The required retainer level;
      * `Task` - The task reference used to map to the below tasks dataset.
      */
      columns: [
        'ID',
        'IsRandom',
        'RetainerLevel',
        'Task'
      ],
      filter: (data) => {
        return data.filter(entry => entry.IsRandom);
      },
      isPaginated: true,
      log: 'Retainer Venture data',
      method: 'fetch',
      name: 'retainerVentures'
    },
    tasks: {
      /**
      * For retainer venture task entries we need to extract the following fields:
      * `ID` - Used to link the content to the data;
      * `Name_{lang}` - Localised name.
      */
      columns: [
        'ID',
        ...helper.localisedColumnProperty(`Name`)
      ],
      isPaginated: true,
      log: 'Retainer Venture tasks',
      method: 'fetch',
      name: 'retainerVenturesRandom'
    }
  },
  shops: {
    bNPCNames: {
      /**
       * For BNPCBase entries we need to extract the following fields:
       * `ID` - Used to map other content to the NPC;
       * `Name_{lang}` - Localised name.
       */
      columns: [
        'ID',
        ...helper.localisedColumnProperty('Name')
      ],
      isPaginated: true,
      log: 'BNPCNames (for Shops)',
      method: 'fetch',
      name: 'bNPCName'
    },
    eNPCResident: {
      cacheAs: 'npc-shops',
      /**
       * For ENPCResidents we need to extract the following fields:
       * `Base` - The ENPCBase data's...
       *   `ENpcData{0...n}` - External references used for mapping to Custom Talk entries;
       * `GilShop.*` - An array of gil shops attached to the NPC's...
       *   `Name_{lang}` - Localised name;
       *   `ID` - Shop identifier;
       *   `Items` - The items the shop sells;
       * `ID` - The ID of the NPC;
       * `Name_{lang}` - Localised name.
       * `SpecialShop` - An array of special shops attached to the NPC.
       */
      columns: [
        ...new Array(eNPCBaseDataRefs).fill(1).map((_, index) => `Base.ENpcData${index}`),
        ...helper.localisedColumnProperty(`GilShop.*.Name`),
        'GilShop.*.ID',
        'GilShop.*.Items',
        'ID',
        ...helper.localisedColumnProperty(`Name`),
        'SpecialShop'
      ],
      eNPCBaseDataRefs,
      isPaginated: true,
      log: 'ENPCResidents (for Shops)',
      method: 'fetch',
      name: 'eNPCResident',
      specialShopItemIndexes
    },
    gcScripShopItem: {
      /**
       * For GC scrip shop items we need to extract the following fields...
       * `CostGCSeals` - How much the item costs to buy;
       * `ID` - The resource's ID, used for error handling;
       * `ItemTargetID` - The item's ID used to link the result to the items data set;
       * `RequiredGrandCompanyRank` - The grand company rank's...
       *   `Tier` - Level.
       */
      columns: [
        'CostGCSeals',
        'ID',
        'ItemTargetID',
        'RequiredGrandCompanyRank.Tier'
      ],
      isPaginated: true,
      log: 'Grand Company Shop Items',
      method: 'fetch',
      name: 'gcScripShopItem'
    },
    gilShops: {
      /**
       * For Gil Shops we need to extract the following fields...
       * `ID` - The shop's ID;
       * `Items` - The items the shop sells;
       * `Name_{lang}` - Localised name.
       */
      columns: [
        'ID',
        'Items',
        ...helper.localisedColumnProperty(`Name`),
      ],
      isPaginated: true,
      log: 'Gil Shops',
      method: 'fetch',
      name: 'gilShops'
    },
    specialShops: {
      /**
       * For Special Shops we need to extract the following fields...
       * `CountCost${0...n}` - The cost of each item in the shop;
       * `ID` - The shop's ID;
       * `ItemCost{0...n}TargetID` - The currency item target;
       * `ItemCost${0...n}` - The currency item object;
       * `ItemReceive${0...n}TargetID` - The item being purchased;
       * `Name_{lang}` - Localised name.
       */
      columns: [
        'ID',
        ...specialShopItemIndexes.reduce((arr, specialShopItemIndex) => {
          return [
            ...arr,
            `CountCost${specialShopItemIndex}`,
            `ItemCost${specialShopItemIndex}TargetID`,
            `ItemCost${specialShopItemIndex}`,
            `ItemReceive${specialShopItemIndex}TargetID`
          ];
        }, []),
        ...helper.localisedColumnProperty(`Name`),
      ],
      isPaginated: true,
      log: 'Special Shops',
      method: 'fetch',
      name: 'specialShops',
      specialShopItemIndexes
    }
  },
  treasureHunt: {
    /**
     * For Treasure Hunt entries (Timeworn Maps) we need to extract the following fields...
     * `ID` - The hunt's ID;
     * `ItemName` - The event item's...
     *   `Name_{lang}` - Localised name;
     * `MaxPartySize` - Party size;
     */
     columns: [
       'ID',
        ...helper.localisedColumnProperty(`ItemName.Name`),
        'MaxPartySize'
     ],
      isPaginated: true,
      log: 'Treasure Hunt (timeworn maps)',
      method: 'fetch',
      name: 'treasureHunt'
  }
}