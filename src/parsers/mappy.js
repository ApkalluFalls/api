const fastCSV = require("fast-csv");
const fetch = require('node-fetch');
const fs = require('fs');
const helper = require('../xivapi/helper');

/**
 * This file parses map data from XIVAPI's Mappy.
 * https://xivapi.com/download?data=map_data
 */
module.exports = async (npcs) => {
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
    const customNPCData = require('../../extensions/npcs.js');

    const parsed = {
      npcs: [...customNPCData]
    };

    fastCSV.fromString(csv, {
      headers: true
    }).on("data", (data) => {
      switch (data.ContentIndex) {
        case 'ENPC':
          parsed.npcs.push({
            id: Number(data.ENpcResidentID),
            location: Number(data.MapTerritoryID),
            type: data.Type,
            x: Number(Number(data.PosX).toFixed(1)),
            y: Number(Number(data.PosY).toFixed(1))
          });
          return;
        default:
          return;
      }
    }).on("end", () => {
      resolve(parsed);
    });
  });

  const allNPCData = npcs.map(npc => {
    const mappyMatch = data.npcs.find(mappyNPC => mappyNPC.id === npc.ID) || {};

    return {
      ...mappyMatch,
      id: npc.ID,
      name: helper.getLocalisedNamesObject(npc)
    }
  });

  fs.writeFileSync(
    './data/npcs.json',
    JSON.stringify(allNPCData),
    'utf8'
  );
  console.info(`Map data parsed, ${data.npcs.length} NPC entries parsed.`);
  console.timeEnd('Map Data');
};