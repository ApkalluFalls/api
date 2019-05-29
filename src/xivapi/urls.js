const xivapiBase = 'https://xivapi.com';

module.exports = {
  minion: (id) => `${xivapiBase}/companion/${id}`,
  minions: () => `${xivapiBase}/companion`,
  search: () => `${xivapiBase}/search`
}