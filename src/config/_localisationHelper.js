const _keys = require('../config/_keys');
const keys = _keys.contentFilters;

module.exports = {
  achievementShort: (entry, language) => ([
    'achievement',
    2,
    [entry.name[language]]
  ]),
  collectorsEditionShort: (entry, language) => ([
    'collectorsEdition',
    3,
    [entry.expansion[language]],
    {
      [keys.storePurchase]: true
    }
  ]),
  companionChocoboShort: (entry, language) => ([
    'companionChocobo',
    15,
    [entry.skillTree]
  ]),
  craftShort: (entry, language) => ([
    'craft',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  defaultShort: () => ([
    'byDefault', 14, []
  ]),
  externalPromotionShort: (entry, language) => ([
    'promo',
    8,
    [typeof entry.name === 'object' ? entry.name[language] : entry.name],
    {
      [keys.externalPromo]: true
    }
  ]),
  fanFestivalShort: (entry, language) => ([
    'fanFest',
    8,
    [entry.year, entry.location[language]],
    {
      [keys.realWorldEvent]: true
    }
  ]),
  fanFestivalStreamShort: (entry, language) => ([
    'fanFestStream',
    8,
    [entry.year, entry.location[language]],
    {
      [keys.realWorldEvent]: true
    }
  ]),
  fates: {
    fateShort: (entry, language) => ([
      'fate',
      12,
      [
        entry.fate.level,
        entry.fate.name[language],
        entry.map.name[language],
        entry.x,
        entry.y
      ]
    ]),
    instancedFATEShort: (entry, language) => ([
      'instancedFATE',
      12,
      [
        entry.fate.level,
        entry.fate.name[language],
        entry.map.name[language]
      ]
    ])
  },
  forumContestShort: () => ([
    'forumContest', 16, []
  ]),
  gatherShort: (entry, language) => ([
    'gather',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  genericShort: (entry, language) => ([
    'generic',
    13,
    [entry.text[language]]
  ]),
  instanceShort: (entry, language) => ([
    'instance',
    4,
    [entry.level, entry.name[language], entry.type[language]]
  ]),
  itemExchangeShort: (entry, language) => ([
    'itemExchange',
    9,
    [
      entry.item.name[language],
      entry.npc.name[language],
      entry.map.name[language],
      entry.npc.x,
      entry.npc.y
    ]
  ]),
  legacyLevelGoalShort: (entry, language) => ([
    'legacyLevelGoal',
    5,
    [
      entry.level,
      entry.expansion[language]
    ],
    {
      [keys.legacy]: true
    }
  ]),
  legacyStatusShort: (entry, language) => ([
    'legacyStatus',
    5,
    [
      entry.days,
      entry.months,
      entry.expansion[language]
    ],
    {
      [keys.legacy]: true
    }
  ]),
  quest: {
    eventQuestShort: (quest, language) => ([
      'eventQuest',
      'q3',
      [quest.level, quest.name[language], quest.journal.category[language]],
      {
        [keys.event]: true
      }
    ]),
    instantShort: (quest, language) => ([
      'questInstant',
      'q2',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    msqShort: (quest, language) => ([
      'msq',
      'q1',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    questShort: (quest, language) => ([
      'quest',
      'q2',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ])
  },
  recruitAFriendShort: (entry) => ([
    'recruitAFriend', 6, [entry.days],
    {
      [keys.realWorldEvent]: true
    }
  ]),
  retainerVentureShort: (entry, language) => ([
    'venture',
    10,
    [entry.level, entry.name[language]]
  ]),
  mogStationShort: () => ([
    'mogStation', 7, undefined,
    {
      [keys.storePurchase]: true
    }
  ]),
  shop: {
    gilShort: (entry, language) => ([
      'gilShop',
      1,
      [
        entry.cost,
        entry.currency.name[language],
        entry.npc.name[language],
        entry.map.name[language],
        entry.npc.x,
        entry.npc.y
      ]
    ]),
    gilAfterFateShort: (entry, language) => ([
      'gilAfterFate',
      1,
      [
        entry.cost,
        entry.currency.name[language],
        entry.bNPC.name[language],
        entry.fate.level,
        entry.fate.name[language],
        entry.map.name[language],
        entry.x,
        entry.y
      ]
    ]),
    specialShort: (entry, language) => ([
      'specialShop',
      1,
      [
        entry.cost,
        entry.currency.name[language],
        entry.npc.name[language],
        entry.map.name[language],
        entry.npc.x,
        entry.npc.y
      ]
    ])
  },
  treasureHuntShort: (entry, language) => ([
    'treasureHunt',
    11,
    [entry.name[language]]
  ]),
  misc: {
    'Legacy (1.0)': {
      de: 'Legacy (1.0)',
      en: 'Legacy (1.0)',
      fr: 'Legacy (1.0)',
      jp: 'LEGACY'
    },
    'A Realm Reborn': {
      de: 'A Realm Reborn',
      en: 'A Realm Reborn',
      fr: 'A Realm Reborn',
      ja: '新生エオルゼア'
    },
    'Heavensward': {
      de: 'Heavensward',
      en: 'Heavensward',
      fr: 'Heavensward',
      ja: '蒼天のイシュガルド'
    },
    'Stormblood': {
      de: 'Stormblood',
      en: 'Stormblood',
      fr: 'Stormblood',
      jp: '紅蓮のリベレーター'
    }
  }
}