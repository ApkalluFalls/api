const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Parse gathering data from XIVAPI.
 */
module.exports = (
  gatheringPoints,
  gatheringItems,
  gatheringTypes,
  fishingSpots,
  spearFishingItems
) => {
  const config = require('../config/data').gathering;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

  // Botany and mining...
  gatheringItems.reduce((arr, gatheringItem) => {
    const match = allItems.find(item => item.id === gatheringItem.Item);

    if (!match) {
      return arr;
    }

    return [
      ...arr, {
        gatheringItem,
        gatheringPoints: gatheringPoints.filter(gatheringPoint => {
          const {
            GatheringPointBase
          } = gatheringPoint;

          return config.points.gatheringItemIDFields.filter(field => (
            GatheringPointBase[field] === gatheringItem.ID
          )).length;
        }),
        item: match
      }
    ];
  }, []).forEach(entry => {
    const {
      gatheringItem,
      gatheringPoints,
      item
    } = entry;

    const {
      contentType
    } = item;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    gatheringPoints.forEach(gatheringPoint => {
      const {
        GatheringPointBase
      } = gatheringPoint;

      const {
        GatheringType
      } = GatheringPointBase;

      parsed[contentType].push({
        contentId: item.contentId,
        icon: GatheringType.IconMainID,
        iconPath: GatheringType.IconMain,
        job: {
          level: GatheringPointBase.GatheringLevel,
          name: helper.getLocalisedNamesObject(GatheringType)
        },
        location: gatheringPoint.TerritoryType.ID
      })
    });
  });

  const fishingGatheringType = gatheringTypes.find(gatheringType => gatheringType.ID === 4);

  // Fishing...
  fishingSpots.reduce((arr, fishingSpot) => {
    let items = [];

    config.fishingSpots.fishingSpotItemIDFields.forEach(key => {
      items = [
        ...items,
        ...allItems.filter(item => item.id === fishingSpot[key])
      ]
    });

    return [
      ...arr,
      ...items.map(item => ({
        fishingSpot,
        item
      }))
    ];
  }, []).forEach(entry => {
    const {
      fishingSpot,
      item
    } = entry;

    const {
      contentType
    } = item;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    parsed[contentType].push({
      contentId: item.contentId,
      icon: fishingGatheringType.IconMainID,
      iconPath: fishingGatheringType.IconMain,
      job: {
        level: fishingSpot.GatheringLevel,
        /**
         * All translations are in Japanese for the Name entry for the SpearfishingItem data set.
         * Because of this we need to manually provide the translations and move away from Spear
         * Fishing.
         */
        name: {
          de: 'Angeln',
          en: 'Fishing',
          fr: 'Pêche',
          ja: '釣り'
        }
      },
      location: fishingSpot.TerritoryType.ID
    });
  })

  // Spear fishing...
  spearFishingItems.reduce((arr, spearFishingItem) => {
    const match = allItems.find(item => item.id === spearFishingItem.ItemTargetID);

    if (!match) {
      return arr;
    }

    return [
      ...arr, {
        item: match,
        spearFishingItem
      }
    ];
  }, []).forEach(entry => {
    const {
      spearFishingItem,
      item
    } = entry;

    const {
      contentType
    } = item;

    const {
      GatheringItemLevel
    } = spearFishingItem;
    
    if (!parsed[contentType]) {
      parsed[contentType] = [];
    }

    parsed[contentType].push({
      contentId: item.contentId,
      icon: fishingGatheringType.IconMainID,
      iconPath: fishingGatheringType.IconMain,
      job: {
        level: GatheringItemLevel.GatheringItemLevel,
        /**
         * All translations are in Japanese for the Name entry for the SpearfishingItem data set.
         * Because of this we need to manually provide the translations.
         */
        name: {
          de: 'Speerfischen',
          en: 'Spear fishing',
          fr: 'Pêche au harpon',
          ja: '銛'
        },
        stars: GatheringItemLevel.Stars
      },
      location: spearFishingItem.TerritoryType.ID
    });
  });

  fs.writeFileSync(
    './data/methods/gathering.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`Gathering data parsed.`);
};