// @flow

/*
 * Store the locale-specific strings
 * Must be imported AFTER office.initialize
 */

let UIStrings = (function() {
  var UIStrings = {};

  // English (alphabetically ordered)
  UIStrings.EN = {};

  // French
  UIStrings.FR = {};

  // Spanish
  UIStrings.ES = {};

  // Ukrainian
  UIStrings.UK = {};

  // Russian
  UIStrings.RU = {};

  UIStrings.getLocaleStrings = function(locale: string): Object {
    var text;

    // Get the resource strings that match the language.
    switch (locale) {
      case 'en-US':
        text = UIStrings.EN;
        break;
      case 'fr-FR':
        text = UIStrings.FR;
        break;
      case 'es-ES':
        text = UIStrings.ES;
        break;
      case 'uk-UA':
        text = UIStrings.UK;
        break;
      case 'ru-RU':
        text = UIStrings.RU;
        break;
      default:
        text = UIStrings.EN;
        break;
    }

    return text;
  };

  return UIStrings;
})();

const userLanguage =
  window.Office && window.Office.context
    ? window.Office.context.displayLanguage
    : 'en-US';
const Locale = UIStrings.getLocaleStrings(userLanguage);

export default Locale;
