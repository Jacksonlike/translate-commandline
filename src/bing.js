const superagent = require('superagent');
const ora = require('ora');
const HTMLParser = require('node-html-parser');
const print = require('./tools/print');
const isType = require('./tools/isType');

const site = 'cn.bing.com';
const translateUrl = 'http://cn.bing.com/ttranslatev3';
const guessUrl = 'http://cn.bing.com/tlookupv3';
const dictUrl = 'https://cn.bing.com/dict/search?q=';

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
      print.error(`<${translateUrl}> unknown error, response body:${JSON.stringify(body)}`);
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

function matchTranscription(html) {
  // const titleString = html.match(/class="hd_p1_1".*?\<\/strong\>/)[0];
  const tNode = html.querySelector(".hd_p1_1");
  if (!tNode || !tNode.childNodes) {
    return;
  }


}

async function dict(text) {
  try {
    const response = await superagent.get(`${dictUrl}${encodeURIComponent(text)}`)
    if (response.status !== 200) {
      print.error(
        `<${dictUrl}> request error, response code:${response.status}!`,
      );
      return;
    }

    const html = HTMLParser.parse(response.text);
    const transcription = matchTranscription(html);
    console.log(transcription, "33333333");
  } catch (err) {
    print.error(
      `<${dictUrl}> request error（${err}）, please check your network!`,
    );
    return;
  }
}

async function printTranslations(text, to) {
  let spinner = ora().start();
  print.title(text, site);
  const describe = await translate(text, to);
  if (!describe) {
    spinner.fail(`Can not translate "${text}" !`);
    return false;
  }
  spinner.stop();

  const supportDict = ["zh-Hans", "en"];
  if (supportDict.includes(to)
    && supportDict.includes(describe.language)) {
    spinner = ora().start();
    dict(text);
    spinner.stop();
    return true;
  }

  spinner = ora().start();
  const guessWords = await guess(describe.language, text, to);
  spinner.stop();
  print.result(describe.text, describe.transliteration);
  print.allTranslations(guessWords);
  return true;
}

module.exports = {
  translate,
  guess,
  printTranslations,
};
