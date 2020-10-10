var entityToCharRegex, charToEntity, entityToChar;

function resetCharacterEntities() {
  charToEntity = {};
  entityToChar = {};
  // add the default set
  addCharacterEntities({
    '&amp;': '&',
    '&gt;': '>',
    '&lt;': '<',
    '&quot;': '"',
    '&#39;': "'",
  });
}

function addCharacterEntities(newEntities) {
  var charKeys = [],
    entityKeys = [],
    key,
    echar;
  for (key in newEntities) {
    echar = newEntities[key];
    entityToChar[key] = echar;
    charToEntity[echar] = key;
    charKeys.push(echar);
    entityKeys.push(key);
  }
  charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
  entityToCharRegex = new RegExp(
    '(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')',
    'g',
  );
}

function htmlDecode(value) {
  var htmlDecodeReplaceFn = function (_, capture) {
    return capture in entityToChar
      ? entityToChar[capture]
      : String.fromCharCode(parseInt(capture.substr(2), 10));
  };

  return !value
    ? value
    : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
}

resetCharacterEntities();

module.exports = htmlDecode;
