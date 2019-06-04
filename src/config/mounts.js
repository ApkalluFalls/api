const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'GamePatch.ID',
      'Icon',
      'IconID',
      'IconSmall',
      'ID',
      ...helper.localisedColumnProperty(`Name`)
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Mounts',
    structure: []
  }
};