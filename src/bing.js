const superagent = require('superagent');
const ora = require('ora');
const print = require('./tools/print');
const isType = require('./tools/isType');

const site = 'cn.bing.com';
const translateUrl = 'http://cn.bing.com/ttranslatev3';
const guessUrl = 'http://cn.bing.com/tlookupv3';

async function translate(text, to) {
  const result = {
    language: '',
    text: '',
    transliteration: '',
  };

  try {
    const response = await superagent
      .post(translateUrl)
      .type('from')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set(
        'User-Agent',
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
      )
      .send({ fromLang: 'auto-detect', text, to });

    if (response.status !== 200) {
      print.error(
        `<${translateUrl}> request error, response code:${response.status}!`,
      );
      return false;
    }

    const body = response.body;
    if (!isType.isArray(body) || body.length <= 0) {
      print.error(`<${translateUrl}> unknown error, response body:${body}】`);
      return false;
    }

    // console.log(JSON.stringify(body[0]));
    result.language = body[0].detectedLanguage.language;
    result.text = body[0].translations[0].text;
    if (body[0].translations[0].transliteration) {
      result.transliteration = body[0].translations[0].transliteration.text;
    }
  } catch (err) {
    print.error(
      `<${translateUrl}> request error（${err}）, please check your network!`,
    );
    return false;
  }

  return result;
}

async function guess(from, text, to) {
  try {
    const response = await superagent
      .post(guessUrl)
      .type('from')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ from, text, to });
    if (response.status !== 200) {
      print.error(
        `<${guessUrl}> request error, response code:${response.status}!`,
      );
      return [];
    }

    if (
      !isType.isArray(response.body) ||
      response.body.length <= 0 ||
      !response.body[0].translations
    ) {
      return [];
    }

    return response.body[0].translations.map((item) => ({
      text: item.normalizedTarget,
      transliteration: item.transliteration,
    }));
  } catch (err) {
    print.error(
      `<${guessUrl}> request error（${err}）, please check your network!`,
    );
    return [];
  }
}

async function printTranslations(text, to) {
  const spinner = ora().start();
  print.title(text, site);
  const describe = await translate(text, to);
  if (!describe) {
    return false;
  }
  const guessWords = await guess(describe.language, text, to);
  spinner.stop();
  print.result(describe.text, describe.transliteration);
  print.allTranslations(guessWords);
}

module.exports = {
  translate,
  guess,
  printTranslations,
};
