const fs = require('fs');
const APICrawler = require('./APICrawler');

class API {
  async init(optionsIn) {
    const validOptions = [
      'minions',
      'methods',
      'icons',
    ];
  
    const args = (
      optionsIn.length
        ? optionsIn
        : validOptions
    );
  
    const options = args.filter(value => validOptions.indexOf(value) !== -1);
  
    if (!options.length) {
      console.warn('No valid options specified to API init.');
      console.info(`Valid options include: '${validOptions.join('\', \'')}'`);
      return;
    }
  
    this.apiKey = await fs.readFileSync('../xivapi-key.txt', 'utf-8');
    this.options = options;
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

    if (name === 'methods') {
      console.time('Methods');
      console.info('Starting parsing of obtain methods...');

      const items = await new APICrawler(config.items, this.apiKey).search();
      await require('./parsers/items')(items);
      
      const quests = await new APICrawler(config.quests, this.apiKey).search();
      await require('./parsers/quests')(quests);

      const recipes = await new APICrawler(config.recipes, this.apiKey).search();
      await require('./parsers/recipes')(recipes);

      console.info('Finished parsing of obtain methods.');
      console.timeEnd('Methods');
      return;
    }

    const list = await new APICrawler(config.list, this.apiKey).fetch();
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