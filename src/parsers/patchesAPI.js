const fs = require('fs');
const _keys = require('../config/_keys');

/**
 * Create patch lists in various languages.
 * @param {String} language - The localisation code (e.g. `"en"`)
 */
module.exports = (language = 'en') => {
  const patches = require('../../data/patches');

  if (!patches) {
    console.error('Data has not been fetched. Please update the data first.');
    return;
  }

  const keys = _keys.patches;

  const parsed = patches.map(entry => {
    const response = {
      [keys.date]: entry.date,
      [keys.id]: entry.id,
      [keys.name]: entry.name[language] || entry.name.en,
      [keys.version]: entry.version
    };

    if (entry.banner) {
      response[keys.banner] = entry.banner;
    }

    if (entry.isExpansion) {
      response[keys.isExpansion] = true;
    }

    return response;
  });

  fs.writeFileSync(
    `./docs/${language}/patches.json`,
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`Patches API generated with locale: ${language}.`);
};