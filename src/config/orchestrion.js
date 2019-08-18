const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      ...helper.localisedColumnProperty(`Description`),
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'OrchestrionUiparam',
      'Patch'
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Orchestrion',
    structure: [
      'Category',
      'Order'
    ]
  }
};