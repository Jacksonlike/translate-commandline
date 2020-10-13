const getTrueLength = (str) => {
  let len = str.length,
    trueLen = 0;
  for (let x = 0; x < len; x++) {
    if (str.charCodeAt(x) > 128) {
      trueLen += 2;
    } else {
      trueLen += 1;
    }
  }
  return trueLen;
};

const smoothString = (str, len) => {
  const trueLen = getTrueLength(str);
  const fixLen = len - trueLen;
  if (fixLen <= 0) {
    return str;
  }

  const rightLen = Math.floor(fixLen / 2);
  const leftLen = fixLen - rightLen;

  const leftStr = Array.from({ length: leftLen }, (_) => ' ').join('');
  const rightStr = Array.from({ length: rightLen }, (_) => ' ').join('');

  return `${leftStr}${str}${rightStr}`;
};

module.exports = {
  getTrueLength,
  smoothString,
};
