const HTMLParser = require('node-html-parser');
const htmlDecode = require('./tools/htmlDecode');

function matchTranscription(html) {
  let result = '';
  let mp3 = null;
  const tNode = html.querySelector('.hd_p1_1');
  if (!tNode || !tNode.childNodes) {
    return [result, mp3];
  }

  tNode.childNodes.forEach((item) => {
    if (HTMLParser.NodeType.TEXT_NODE === item.nodeType) {
      result += htmlDecode(item.toString()) + '  ';
    }
    if (HTMLParser.NodeType.ELEMENT_NODE === item.nodeType) {
      if (item.classNames.includes('b_primtxt')) {
        result += htmlDecode(item.rawText) + '  ';
      } else if (!mp3) {
        const mp3String = item.querySelector('a').getAttribute('onClick');
        if (mp3String) {
          const matchGroup = mp3String.match('https?://.*.mp3');
          if (matchGroup) {
            mp3 = matchGroup[0];
          }
        }
      }
    }
  });

  return [result.trimRight(), mp3];
}

function matchHeadTitle(html) {
  let result = '';
  const tNode = html.querySelector('#headword');
  if (tNode) {
    result = htmlDecode(tNode.rawText);
  }
  return result;
}

function matchInterpretation(qDef) {
  const result = [];
  const ul = qDef.childNodes.find((item) => item.tagName === 'UL');
  if (!ul || !ul.childNodes) {
    return result;
  }

  ul.childNodes.forEach((item) => {
    if (item.childNodes) {
      result.push([
        htmlDecode(item.childNodes[0].rawText),
        htmlDecode(item.childNodes[1].rawText),
      ]);
    }
  });

  return result;
}

function matchForm(qDef) {
  const result = [];
  const node = qDef.querySelector('.hd_if');
  if (!node || !node.childNodes) {
    return result;
  }

  let ceil = [];
  node.childNodes.forEach((item) => {
    if (item.tagName === 'SPAN') {
      ceil = [htmlDecode(item.rawText)];
    } else if (item.tagName === 'A' && ceil.length === 1) {
      ceil.push(htmlDecode(item.rawText));
      result.push(ceil);
    }
  });

  return result;
}

function matchNotes(html) {
  const result = {};
  const qDef = html.querySelector('.qdef');
  if (!qDef || !qDef.childNodes) {
    return result;
  }

  result.interpretation = matchInterpretation(qDef);
  result.form = matchForm(qDef);
  return result;
}

function parseBingDict(params) {
  const html = HTMLParser.parse(params);
  const title = matchHeadTitle(html);
  const [transcription, mp3] = matchTranscription(html);
  const notes = matchNotes(html);
  return {
    title,
    transcription,
    notes,
    mp3,
  };
}

module.exports = parseBingDict;
