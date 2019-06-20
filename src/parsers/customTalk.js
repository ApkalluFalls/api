const APICrawler = require('../APICrawler');
const fs = require('fs');

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

  for (const entry of data) {
    for (let i = 0; i < customTalkScriptArgs; i++) {
      const reference = entry[`ScriptArg${i}`];

      if (reference >= 262000 && reference < 264000) {
        const crawler = new APICrawler({
          args: [reference],
          isPaginated: false,
          log: `Gil Shop #${reference}`,
          name: 'gilShop'
        });

        const data = await crawler.fetch();

        // Gil shops.
        parsed.gilShops.push({
          customTalk: entry.ID,
          data
        });
      } else if (reference >= 1760000 && reference < 1770000) {
        const crawler = await new APICrawler({
          args: [reference],
          isPaginated: false,
          log: `Special Shop #${reference}`,
          name: 'specialShop'
        });

        const data = await crawler.fetch();

        // Special shops.
        parsed.specialShops.push({
          customTalk: entry.ID,
          data
        });
      }
    }
  };

  fs.writeFileSync(
    './data/customTalk.json',
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${config.log} data parsed.`);
};