const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Parse gathering data from XIVAPI.
 */
module.exports = async (gatheringPoints, gatheringItems) => {
  const config = require('../config/data').gathering;
  const parsed = {};

  const allItems = Object.values(items).reduce((arr, itemGroup) => ([
    ...arr,
    ...itemGroup
  ]), []);

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
        location: helper.getLocalisedNamesObject(gatheringPoint.TerritoryType.PlaceName)
      })
    });
  });

  fs.writeFileSync(
    '../data/methods/gathering.json',
    JSON.stringify(parsed),
    'utf8',
    () => console.info(`Gathering data parsed.`)
  );
};