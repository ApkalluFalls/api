const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'EmoteCategoryTargetID',
      'Icon',
      'IconID',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'Patch',
      'TextCommandTargetID',
      'UnlockLink'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Emotes',
    structure: []
  }
};