const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'AchievementCategory',
      ...helper.localisedColumnProperty(`Description`),
      'Icon',
      'IconID',
      'ID',
      'Item',
      'ItemTargetID',
      ...helper.localisedColumnProperty(`Name`),
      'Patch',
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