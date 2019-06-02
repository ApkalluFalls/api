const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      ...helper.localisedColumnProperty(`Description`),
      'GamePatch.ID',
      'Icon',
      'IconID',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'Points'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Achievements'
  }
};