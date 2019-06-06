const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'AchievementCategory',
      ...helper.localisedColumnProperty(`Description`),
      'GamePatch.ID',
      'Icon',
      'IconID',
      'ID',
      'Item',
      'ItemTargetID',
      ...helper.localisedColumnProperty(`Name`),
      'Points'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Achievements',
    structure: [
      'Category',
      'Points',
      'Kind'
    ]
  }
};