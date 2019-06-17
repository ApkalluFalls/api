module.exports = {
  achievementShort: (entry, language) => ([
    'achievementShort',
    2,
    [entry.name[language]]
  ]),
  collectorsEditionShort: (entry, language) => ([
    'collectorsEditionShort',
    3,
    [entry.expansion[language]]
  ]),
  craftShort: (entry, language) => ([
    'craftShort',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  externalPromotionShort: (entry, language) => ([
    'promoShort',
    8,
    [typeof entry.name === 'object' ? entry.name[language] : entry.name]
  ]),
  fanFestivalShort: (entry, language) => ([
    'fanFestShort',
    8,
    [entry.year, entry.location[language]]
  ]),
  fanFestivalStreamShort: (entry, language) => ([
    'fanFestStreamShort',
    8,
    [entry.year, entry.location[language]]
  ]),
  gatherShort: (entry, language) => ([
    'gatherShort',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  instanceShort: (entry, language) => ([
    'instanceShort',
    4,
    [entry.level, entry.name[language], entry.type[language]]
  ]),
  legacyLevelGoalShort: (entry, language) => ([
    'legacyLevelGoalShort',
    5,
    [
      entry.level,
      entry.expansion[language]
    ]
  ]),
  legacyStatusShort: (entry, language) => ([
    'legacyStatusShort',
    5,
    [
      entry.days,
      entry.months,
      entry.expansion[language]
    ]
  ]),
  quest: {
    eventQuestShort: (quest, language) => ([
      'eventQuestShort',
      'q3',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    msqShort: (quest, language) => ([
      'msqShort',
      'q2',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    questShort: (quest, language) => ([
      'questShort',
      'q1',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ])
  },
  recruitAFriendShort: (entry) => ([
    'recruitAFriendShort', 6, [entry.days]
  ]),
  mogStationShort: () => ([
    'mogStationShort', 7
  ]),
  shop: {
    gilShort: (entry, language) => ([
      'gilShopShort',
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
    specialShort: (entry, language) => ([
      'specialShopShort',
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