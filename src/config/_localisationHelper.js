module.exports = {
  achievementShort: (entry, language) => ([
    'achievementShort',
    'achievement',
    [entry.name[language]]
  ]),
  craftShort: (entry, language) => ([
    'craftShort',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  gatherShort: (entry, language) => ([
    'gatherShort',
    entry.icon,
    [entry.job.level, entry.job.name[language], new Array(entry.job.stars).fill('★').join('')]
  ]),
  quest: {
    eventQuestShort: (quest, language) => ([
      'eventQuestShort',
      'event',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    msqShort: (quest, language) => ([
      'msqShort',
      quest.icon,
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    questShort: (quest, language) => ([
      'questShort',
      quest.icon,
      [quest.level, quest.name[language], quest.journal.category[language]]
    ])
  },
  shop: {
    gilShort: (entry, language) => ([
      'gilShopShort',
      'shop',
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
      'shop',
      [
        entry.cost,
        entry.currency.name[language],
        entry.npc.name[language],
        entry.map.name[language],
        entry.npc.x,
        entry.npc.y
      ]
    ])
  }
}