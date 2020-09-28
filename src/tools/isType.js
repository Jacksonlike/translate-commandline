function isType(obj, type) {
  return (
    Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type
  );
}

function isArray(obj) {
  return isType(obj, 'array');
}

module.exports = {
  isType,
  isArray,
};
