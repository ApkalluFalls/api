const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

module.exports = (data, config) => {
  const {
    name
  } = config;

  const parsed = data.map(content => {
    const response = {
      icon: content.IconID,
      id: content.ID,
      name: helper.getLocalisedNamesObject(content),
      patch: content.GamePatch.ID
    };

    if (content === 'Achievements') {
      response.description = helper.getLocalisedNamesObject(content, 'Description');
      response.points = content.Points;
    }

    if (content.IconSmall) {
      response.iconPath = content.IconSmall;
      response.iconLargePath = content.Icon;
      response.iconLarge = Number(
        content.Icon.match(/\d+\.png/)[0].replace('.png', '')
      );
    } else {
      response.iconPath = content.Icon;
    }

    return response;
  });

  fs.writeFileSync(
    `../data/content/${name.toLowerCase()}.json`,
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${name} data parsed.`);
}