const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      ...helper.localisedColumnProperty(`Description`),
      'GamePatch.ID',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'OrchestrionUiparam'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Orchestrion'
  }
};