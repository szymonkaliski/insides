var keysFromArg = require("./keys-from-arg");

module.exports = function(object, key, notFound) {
  return keysFromArg(key).reduce(function(memo, key) {
    return memo && memo[key] ? memo[key] : notFound;
  }, object);
};
