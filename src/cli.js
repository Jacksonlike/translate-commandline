const bing = require('./bing');

module.exports.run = (text, to) => {
  bing.printTranslations(text, to);
};
