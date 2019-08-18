const helper = require('../xivapi/helper');
const _keys = require('../config/_keys');

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
    /**
     * Determine the availability of an achievement.
     * @param {Object} achievement - The achievement to parse.
     */
    getAvailability: (achievement) => {
      const response = {};

      const keys = _keys.contentFilters;

      switch (achievement.category) {
        case 0:
          console.error(`Unhandled category 0 detected on achievement ${achievement.id}`);
          return;
    
        // Seasonal event.
        case 38:
          response[keys.event] = true;
          break;
    
        // Legacy.
        case 54:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 61:
          response[keys.legacy] = true;
          break;
      }

      switch (achievement.id) {
        // Starting city.
        case 310:
        case 311:
        case 312:
          response[keys.startingCity] = true;
          break;
      }

      return response;
    },
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