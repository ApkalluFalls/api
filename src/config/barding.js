const helper = require('../xivapi/helper');

module.exports = {
  list: {
    columns: [
      'GrandCompanyTargetID',
      'IconBody',
      'IconBodyID',
      'IconHead',
      'IconHeadID',
      'IconLegs',
      'IconLegsID',
      'ID',
      ...helper.localisedColumnProperty(`Name`),
      'Patch',
      ...helper.localisedColumnProperty(`Plural`),
      ...helper.localisedColumnProperty(`Singular`)
    ],
    isPaginated: true,
    method: 'fetch',
    name: 'Barding',
    structure: [
      'iconBody',
      'iconHead',
      'iconLegs'
    ]
  }
};