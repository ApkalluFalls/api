const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'EmoteCategoryTargetID',
      'GamePatch.ID',
      'Icon',
      'IconID',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'TextCommandTargetID',
      'UnlockLink'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Emotes',
    structure: []
  }
};