const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

/**
 * Parse recipe data from XIVAPI.
 */
module.exports = (data) => {
  const config = require('../config/data').maps;
  const parsed = data.map(territoryType => ({
    id: territoryType.ID,
    name: helper.getLocalisedNamesObject(territoryType.PlaceName),
    region: helper.getLocalisedNamesObject(territoryType.PlaceNameRegion)
  })).filter(map => map.name.en)

  fs.writeFileSync(
    './data/maps.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};