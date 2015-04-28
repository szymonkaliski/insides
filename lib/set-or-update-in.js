var extend      = require("extend");
var keysFromArg = require("./keys-from-arg");
var isFunction  = require("./is-function");
var isObject    = require("./is-object");

module.exports = function(object, key, value, options) {
  options        = extend({ extend: true }, options);
  var workObject = extend(true, {}, object);

  keysFromArg(key).reduce(function(memo, key, index, keys) {
    if (index === keys.length - 1) {
      value = isFunction(value) ? value(key, memo[key]) : value;

      if (options.extend && memo[key] && isObject(memo[key])) {
        memo[key] = extend(true, memo[key], value);
      }
      else {
        memo[key] = value;
      }
    }
    else if (!memo[key]) {
      memo[key] = {};
    }

    return memo[key];
  }, workObject);

  return workObject;
};
