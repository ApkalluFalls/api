module.exports = {
  /**
   * Generate an array of values with _de, _en, _fr and _ja suffixes.
   * @param {String} property - The property name to suffix.
   */
  localisedColumnProperty: (property = '') => ([
    `${property}_de`,
    `${property}_en`,
    `${property}_ja`,
    `${property}_fr`
  ]),

  /**
   * Pull either the singular or plural localised name depending on an amount.
   * @param {Object} obj - An object containing localised Name_{lang} and optional Plural_{lang} properties.
   * @param {Number} [amount] - An optional amount. If not equal to 1 will attempt to use Plural_{lang} property.
   */
  getLocalisedNamesObject: (obj = {}, amount = 1) => {
    if (amount === 1) {
      return {
        de: obj.Name_de,
        en: obj.Name_en,
        fr: obj.Name_fr,
        ja: obj.Name_ja
      };
    }

    return {
      de: obj.Plural_de || obj.Name_de,
      en: obj.Plural_en || obj.Name_en,
      fr: obj.Plural_fr || obj.Name_fr,
      ja: obj.Plural_ja || obj.Name_ja
    };
  },

  /**
   * Parse an ItemActions object to determine what the content is and, more importantly, what its
   * ID is.
   * @param {Object} itemActions - An ItemActions object.
   */
  getContentFromItemActions: (itemActions = {}) => {
    let type;

    switch (itemActions.Type) {
      case 853:
        type = 'minion';
        break;

      case 1013:
        type = 'chocobo-barding';
        break;

      case 1322:
        type = 'mount';
        break;

      case 5845:
        type = 'minion';
        break;

      default:
        break;
    }

    if (!type) {
      if (itemActions.type >= 5100 && itemActions.type <= 5300) {
        type = 'emote';
      } else {
        type = 'unknown';
      }
    }

    return {
      id: itemActions.ID,
      type
    }
  }
}