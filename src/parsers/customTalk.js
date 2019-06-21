const APICrawler = require('../APICrawler');
const fs = require('fs');
const Progress = require('cli-progress');

/**
 * Parse custom talk data from XIVAPI.
 */
module.exports = async (data) => {
  const config = require('../config/data').customTalk;
  
  const {
    customTalkScriptArgs
  } = config;


  const parsed = {
    gilShops: [],
    specialShops: []
  };

  const gilShops = [];
  const specialShops = [];

  for (const entry of data) {
    for (let i = 0; i < customTalkScriptArgs; i++) {
      const reference = entry[`ScriptArg${i}`];

      if (reference >= 262000 && reference < 264000) {
        const crawler = new APICrawler({
          args: [reference],
          isPaginated: false,
          log: `Gil Shop #${reference}`,
          name: 'gilShop',
          silent: true
        });

        const data = await crawler.fetch();

        // Gil shops.
        gilShops.push({
          customTalk: entry.ID,
          reference
        });
      } else if (reference >= 1760000 && reference < 1770000) {
        // Special shops.
        specialShops.push({
          customTalk: entry.ID,
          reference
        });
      }
    }
  };

  const progressBar = new Progress.Bar({}, Progress.Presets.shades_grey);
  progressBar.start(gilShops.length + specialShops.length, 0);
  let parsedCount = 0;

  // Parse Gil Shops.
  for (const entry of gilShops) {
    const crawler = new APICrawler({
      args: [entry.reference],
      isPaginated: false,
      log: `Gil Shop #${entry.reference}`,
      name: 'gilShop',
      silent: true
    });

    const data = await crawler.fetch();

    parsed.gilShops.push({
      customTalk: entry.customTalk,
      data
    });
    
    progressBar.update(++parsedCount);
  }

  // Parse Special Shops.
  for (const entry of specialShops) {
    const crawler = await new APICrawler({
      args: [entry.reference],
      isPaginated: false,
      log: `Special Shop #${entry.reference}`,
      name: 'specialShop',
      silent: true
    });

    const data = await crawler.fetch();

    parsed.specialShops.push({
      customTalk: entry.customTalk,
      data
    });
    
    progressBar.update(++parsedCount);
  }

  progressBar.stop();

  fs.writeFileSync(
    './data/customTalk.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};