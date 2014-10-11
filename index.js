module.exports = function(object, transformKeyFn) {
  if (typeof transformKeyFn == 'function') {
    return transform(transformKeyFn)(object);
  }
  return transform(object);
};

function transform(transformKeyFn) {
  return function transformKeys(object) {
    if (!object || Array.isArray(object) || typeof object !== 'object') {
      return object;
    }
    var keys = Object.keys(object);
    if (keys.length === 0) {
      return object;
    }
    return keys.reduce(function (acc, key) {
      acc[transformKeyFn(key)] = transformKeys(object[key]);
      return acc;
    }, {});
  }
}