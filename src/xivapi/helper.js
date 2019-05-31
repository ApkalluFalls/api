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
   * @param {String} field - An optional override to the field name.
   * @param {Number} [amount] - An optional amount. If not equal to 1 will attempt to use Plural_{lang} property.
   */
  getLocalisedNamesObject: (obj = {}, field = 'Name', amount = 1) => {
    if (amount === 1) {
      return {
        de: obj[`${field}_de`],
        en: obj[`${field}_en`],
        fr: obj[`${field}_fr`],
        ja: obj[`${field}_ja`]
      };
    }

    return {
      de: obj.Plural_de || obj[`${field}_de`],
      en: obj.Plural_en || obj[`${field}_en`],
      fr: obj.Plural_fr || obj[`${field}_fr`],
      ja: obj.Plural_ja || obj[`${field}_ja`]
    };
  },

  /**
   * Parse an ItemActions object to determine what the content is and, more importantly, what its
   * ID is.
   * @param {Object} itemActions - An ItemActions object.
   */
  getContentFromItemActions: (itemActions = {}) => {
    let contentType;

    const {
      Data0,
      Data1,
      Data2,
      Type
    } = itemActions;

    switch (Type) {
      case 853:
        contentType = 'minion';
        break;

      case 1013:
        contentType = 'chocobo-barding';
        break;

      case 1322:
        contentType = 'mount';
        break;

      case 5845:
        contentType = 'orchestrion-roll';
        break;

      default:
        break;
    }

    if (!contentType) {
      if (Data1 >= 5100 && Data1 <= 5300 && Data2 > 0) {
        contentType = 'emote';
      } else {
        contentType = 'unknown';
      }
    }

    return {
      id: Data0,
      type: contentType
    }
  }
}