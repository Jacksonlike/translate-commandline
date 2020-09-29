const chalk = require('chalk');

function error(msg) {
  console.log(chalk.red('[error]'), msg);
}

function title(word, site) {
  console.log(` ${word}   ~   ${chalk.gray(site)}`);
  console.log();
}

function result(word, transliteration) {
  let result = chalk.bold(word);
  if (transliteration) {
    result += chalk.green(`  [ ${transliteration} ]`);
  }

  console.log(result);
  console.log();
}

function allTranslations(translations) {
  translations.forEach((item, i) => {
    let text = chalk.grey(` - ${i + 1} ${item.text}`);
    if (item.transliteration) {
      text += chalk.grey(` [ ${item.transliteration} ]`);
    }
    console.log(text);
  });
}

module.exports = {
  error,
  title,
  result,
  allTranslations,
};
