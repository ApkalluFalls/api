const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'Icon',
      'IconID',
      'IconSmall',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'Patch'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Minions',
    structure: []
  }
};