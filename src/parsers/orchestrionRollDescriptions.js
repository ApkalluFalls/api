const _localisationHelper = require('../config/_localisationHelper');
const instances = require('../../data/instances.json');

/**
 * Attempt to determine obtain methods from orchestrion roll descriptions.
 * @param {Object} data - Orchestrion roll data (English).
 * @param {String} language - The locale key (e.g. `"en"`).
 */
module.exports = (data, language) => {
  const { id: contentId } = data;
  const description = data.description.en;

  // Instances.
  const duties = description.match(/^Obtained in (.*)\.$/);
  if (duties && duties[1]) {
    const matches = duties[1].split(' or ');
    const response = [];
    matches.forEach(match => {
      const instance = instances.find(instance => instance.name.en === match);
      if (instance) {
        response.push(_localisationHelper.instanceShort({
          contentId,
          ...instance
        }, language));
      }
    })

    if (response.length) {
      return response;
    }
  }

  if (description === 'Available for purchase on the Mog Station.') {
    return _localisationHelper.mogStationShort({
      contentId
    }, language);
  }
};