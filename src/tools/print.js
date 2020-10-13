const chalk = require('chalk');
const { smoothString } = require('./char');

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

function dict(desc) {
  const { title, transcription, notes } = desc;

  let titleString = chalk.bold(title);
  if (transcription) {
    titleString = `${titleString}   ${chalk.magenta(transcription)}`;
  }
  console.log(titleString);
  console.log();

  if (!notes) {
    return;
  }

  const { interpretation, form } = notes;
  if (interpretation) {
    interpretation.forEach((item) => {
      console.log(
        `${chalk.bgGray.bold(smoothString(item[0], 6))} ${chalk.yellow(
          item[1],
        )}`,
      );
    });
    console.log();
  }

  if (form) {
    const formString = form.reduce(
      (pre, item) => `${pre}  ${item[0]}${item[1]}`,
      '',
    );
    console.log(chalk.gray(formString.trimLeft()));
  }
}

module.exports = {
  error,
  title,
  result,
  dict,
  allTranslations,
};
