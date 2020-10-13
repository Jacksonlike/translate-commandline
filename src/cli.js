const bing = require('./bing');

module.exports.run = (text, to, pronunciation = false) => {
  bing.printTranslations(text, to, pronunciation);
};
