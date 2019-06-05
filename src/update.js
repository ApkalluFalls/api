const fs = require('fs');
const APICrawler = require('./APICrawler');
const listAPI = require('./parsers/listAPI');

class API {
  async crawl(config) {
    return await new APICrawler(config, this.apiKey)[config.method]();
  }

  async init(optionsIn) {
    const content = [
      'achievements',
      'barding',
      'emotes',
      'minions',
      'mounts',
      'orchestrion'
    ];

    const validOptions = [
      // Generic data.
      'data',

      // Content.
      ...content,

      // Icon images and sprite sheets.
      'icons'
    ];
  
    let args = (
      optionsIn.length
        ? optionsIn
        : validOptions
    );

    if (args.find(arg => arg === 'cache')) {
      await this.removeCachedData();
      return;
    }

    if (args.find(arg => arg === 'content')) {
      args = content;
    }
  
    const options = args.filter(value => validOptions.indexOf(value) !== -1);
  
    if (!options.length) {
      console.warn('No valid options specified to API init.');
      console.info(`Valid options include: '${validOptions.join('\', \'')}'`);
      return;
    }
  
    this.apiKey = await fs.readFileSync('./xivapi-key.txt', 'utf-8');
    this.options = options;
  }

  async removeCachedData() {
    console.time('Clearing cache');
    console.warn('Removing cached data...');

    const path = './data/cached';
    const files = fs.readdirSync(path).filter(
      file => file.substr(file.length - 4, file.length) === 'json'
    );

    let deletionCount = 0;

    for (const file of files) {
      await new Promise((resolve, reject) => {
        fs.unlink(`${path}/${file}`, error => {
          if (error) {
            console.error(`Failed to remove ${file} due to error: ${error}.`);
            reject(error);
            return;
          }

          deletionCount++;
          resolve();
        })
      });
    }

    console.warn(`Successfully removed ${deletionCount} of ${files.length} cached data files.`);
    console.timeEnd('Clearing cache');
  }

  /**
   * Fetch each specified option.
   */
  async run() {
    if (!Array.isArray(this.options)) {
      return;
    }

    for (const value of this.options) {
      await this.process(value);
    }

    await new Promise(resolve => {
      const version = require('../docs/version.json');
      console.info(`Updating version to ${version + 1}.`);
      fs.writeFile('./docs/version.json', JSON.stringify(Number(version) + 1), resolve);
    })
  }

  /**
   * Fetch and process a given option's data.
   * @param {String} name - The option name.
   */
  async process(name) {
    if (name === 'icons') {
      console.time('Icons');
      console.info('Starting creation of icon sprite sheets...');
      await require('./parsers/icons')();
      console.info('Finished parsing of icon sprite sheets.');
      console.timeEnd('Icons');
      return;
    }

    const config = require(`./config/${name}`);

    if (name === 'data') {
      console.time('Data');
      console.info('Starting parsing of misc required data...');

      // Items.
      const items = await this.crawl(config.items);
      require('./parsers/items')(items);

      // Currencies.
      const currencies = await this.crawl(config.currencies);
      require('./parsers/currencies')(currencies);

      // Gathering.
      const fishingSpots = await this.crawl(config.gathering.fishingSpots);
      const gatheringItems = await this.crawl(config.gathering.items);
      const gatheringPoints = await this.crawl(config.gathering.points);
      const gatheringTypes = await this.crawl(config.gathering.types);
      const spearFishingItems = await this.crawl(config.gathering.spearFishingItems);
      require('./parsers/gathering')(
        gatheringPoints,
        gatheringItems,
        gatheringTypes,
        fishingSpots,
        spearFishingItems
      );

      // // Shops.
      const eNPCResidents = await this.crawl(config.shops.eNPCResident);
      const gcScripShopItems = await this.crawl(config.shops.gcScripShopItem);
      require ('./parsers/shops')(
        eNPCResidents,
        gcScripShopItems
      );

      // // Map data.
      const maps = await this.crawl(config.maps);
      await require('./parsers/maps')(maps);

      // Mappy data (NPCs).
      const npcs = await this.crawl(config.npcs);
      await require('./parsers/mappy')(npcs);

      console.info('Finished parsing of misc required data.');
      console.info('Starting parsing of obtain method data...');
      
      const quests = await this.crawl(config.quests);
      require('./parsers/quests')(quests);

      const recipes = await this.crawl(config.recipes);
      require('./parsers/recipes')(recipes);

      console.info('Finished parsing of obtain methods.');
      console.timeEnd('Data');
      return;
    }

    // All other data has a separate config file.
    const list = await this.crawl(config.list);
    require('./parsers/lists')(list, config.list);

    // Parse lists in various languages.
    await listAPI(name, 'de');
    await listAPI(name, 'en');
    await listAPI(name, 'fr');
    await listAPI(name, 'ja');
  }
}

/**
 * Pretty console logging overrides.
 */
function overrideConsole(icon, prefix, suffix) {
  return (...messages) => {
    if (messages.length === 1 && typeof messages[0] !== 'string') {
      console.log.apply(this, messages);
      return;
    }

    console.log.apply(this, [icon, prefix, ...messages, suffix]);
  };
}

/**
 * This anonymous function is what allows the code to be executed automatically through the
 * terminal. It initialises the above API class and runs the fetcher.
 */
(async () => {
  console.error = overrideConsole('🚫', '\x1b[31m', '\x1b[0m');
  console.info = overrideConsole('ℹ️', '\x1b[36m', '\x1b[0m');
  console.warn = overrideConsole('⚠️', '\x1b[33m', '\x1b[0m');

  const updater = new API();
  await updater.init(process.argv.slice(2));
  updater.run();
})();