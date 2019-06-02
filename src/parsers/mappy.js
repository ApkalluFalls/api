const fastCSV = require("fast-csv");
const fetch = require('node-fetch');
const fs = require('fs');

/**
 * This file parses map data from XIVAPI's Mappy.
 * https://xivapi.com/download?data=map_data
 */
module.exports = async () => {
  console.time('Map Data');
  console.info('Fetching map data from Mappy.');

  const csv = await fetch('https://xivapi.com/download?data=map_data', {
    method: 'GET',
    mode: 'cors'
  })
    .then(response => response.text())
    .catch(e => console.error(e));

  if (!csv) {
    console.error(`Unable to read Mappy data. Skipping.`);
    return;
  }

  console.info('Map data fetched; parsing...');

  const data = await new Promise(resolve => {
    const parsed = {
      npcs: []
    };

    fastCSV.fromString(csv, {
      headers: true
    }).on("data", (data) => {
      switch (data.ContentIndex) {
        case 'ENPC':
          parsed.npcs.push({
            id: data.ENpcResidentID,
            location: data.MapTerritoryID,
            type: data.Type,
            x: data.PosX,
            y: data.PosY
          });
          return;
        default:
          return;
      }
    }).on("end", () => {
      resolve(parsed);
    });
  })

  fs.writeFileSync(
    '../data/npcs.json',
    JSON.stringify(data.npcs),
    'utf8'
  );
  console.info(`Map data parsed, ${data.npcs.length} NPC entries parsed.`);
  console.timeEnd('Map Data');
};