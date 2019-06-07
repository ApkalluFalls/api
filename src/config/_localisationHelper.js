module.exports = {
  achievementShort: (entry, language) => ([
    'achievementShort',
    2,
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
      'q3',
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    msqShort: (quest, language) => ([
      'q2',
      quest.icon,
      [quest.level, quest.name[language], quest.journal.category[language]]
    ]),
    questShort: (quest, language) => ([
      'q1',
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
      2,
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