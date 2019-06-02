const fs = require('fs');
const helper = require('../xivapi/helper');
const items = require('../../data/items.json');

module.exports = (data, config) => {
  const {
    name
  } = config;

  const parsed = data.map(content => {
    const response = {
      name: helper.getLocalisedNamesObject(content),
      patch: content.GamePatch.ID
    };

    if (name !== 'Barding') {
      response.icon = content.IconID;
      response.id = content.ID;
    }

    switch (name) {
      case 'Achievements':
        if (content.AchievementCategory) {
          response.category = content.AchievementCategory.ID;
          response.kind = content.AchievementCategory.AchievementKind.ID;
        } else {
          response.category = -1;
          response.kind = -1;
        }
        response.description = helper.getLocalisedNamesObject(content, 'Description');
        response.points = content.Points;
        break;

      case 'Barding':
        response.grandCompany = content.GrandCompanyTargetID;
        response.iconBody = content.IconBodyID;
        response.iconBodyPath = content.IconBody;
        response.iconHead = content.IconHeadID;
        response.iconHeadPath = content.IconHead;
        response.iconLegs = content.IconLegsID;
        response.iconLegsPath = content.IconLegs;
        response.plural = helper.getLocalisedNamesObject(content, 'Plural');
        response.singular = helper.getLocalisedNamesObject(content, 'Singular');
        break;

      case 'Emotes':
        response.category = content.EmoteCategoryTargetID;
        break;
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