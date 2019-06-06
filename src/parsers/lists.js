const fs = require('fs');
const helper = require('../xivapi/helper');

module.exports = (data, config) => {
  const {
    name
  } = config;

  const filteredData = data.filter(content => {
    // Content without an English name can be ignored.
    if (!content.Name_en) {
      return false;
    }

    switch (name) {
      /**
       * Some achievements have no category. Those ones aren't accessible in the game and never
       * have been.
       */
      case 'Achievements':
        return !!content.AchievementCategory;

      /**
       * Emotes with no TextCommand are duplicates, thought to be different actions under certain
       * circumstances (i.e. sleeping on a bed vs. sleeping elsewhere).
       */
      case 'Emotes':
        return content.TextCommandTargetID !== 0;
    }

    return true;
  });

  // We want to extract all rewards from the achievements data.
  if (name === 'Achievements') {
    const items = require('../../data/items.json');
    const rewards = {};

    const allItems = Object.values(items).reduce((arr, itemGroup) => ([
      ...arr,
      ...itemGroup
    ]), []);

    filteredData.filter(achievement => achievement.ItemTargetID).reduce((arr, achievement) => {
      const match = allItems.find(item => item.id === achievement.ItemTargetID);

      if (!match) {
        return arr;
      }

      return [
        ...arr, {
          achievementId: achievement.ID,
          achievementItem: achievement.Item,
          item: match
        }
      ]
    }, []).forEach(entry => {
      const {
        achievementId,
        achievementItem,
        item
      } = entry;
  
      const {
        contentType
      } = item;
    
      if (!rewards[contentType]) {
        rewards[contentType] = [];
      }

      rewards[contentType].push({
        achievement: achievementId,
        contentId: item.contentId
      })
    });

    fs.writeFileSync(
      `./data/methods/achievements.json`,
      JSON.stringify(rewards),
      'utf8'
    );
    console.info(`${name} rewards parsed.`);
  }

  const parsed = filteredData.map(content => {
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
        response.category = content.AchievementCategory.ID;
        response.kind = content.AchievementCategory.AchievementKind.ID;
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
        response.link = content.UnlockLink;
        break;

      case 'Orchestrion':
        response.category = content.OrchestrionUiparam.OrchestrionCategoryTargetID;
        response.description = helper.getLocalisedNamesObject(content, 'Description');
        response.order = content.OrchestrionUiparam.Order;
        break;
    }

    if (content.IconSmall) {
      response.iconPath = content.IconSmall;
      response.iconLargePath = content.Icon;
      response.iconLarge = Number(
        content.Icon.match(/[A-Za-z0-9]+\.png/)[0].replace('.png', '')
      );
    } else {
      response.iconPath = content.Icon;
    }

    return response;
  });

  fs.writeFileSync(
    `./data/content/${name.toLowerCase()}.json`,
    JSON.stringify(parsed),
    'utf8'
  );
  console.info(`${name} data parsed.`);
}