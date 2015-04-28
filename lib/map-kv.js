var isFunction = require("./is-function");
var isObject   = require("./is-object");

var mapKV = function(object, callback) {
  var out;

  if (isObject(object)) {
    out = {};

    Object.keys(object).forEach(function(key) {
      out[key] = callback(key, object[key], object);
    });
  }
  else {
    out = object;
  }

  return out;
};

var deepMapKV = function(object, depth, callback) {
  var out = {};

  if (isFunction(depth)) {
    callback = depth;
    depth    = 1;
  }

  if (depth === 1) {
    out = mapKV(object, callback);
  }
  else {
    /*jslint unparam: true */
    out = mapKV(object, function(_, value) {
      return deepMapKV(value, depth - 1, callback);
    });
    /*jslint unparam: false */
  }

  return out;
};

module.exports = deepMapKV;
