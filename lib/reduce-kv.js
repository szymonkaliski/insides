var isFunction = require("./is-function");
var isObject   = require("./is-object");

var reduceKV = function(object, callback, initialValue) {
  var returnValue = initialValue;

  if (isObject(object)) {
    var keys        = Object.keys(object);

    if (returnValue === undefined) {
      var initialKey = keys.pop();
      returnValue    = object[initialKey];
    }

    keys.forEach(function(key) {
      returnValue = callback(returnValue, key, object[key], object);
    });
  }

  return returnValue;
};

var deepReduceKV = function(object, depth, callback, initialValue) {
  var out;

  if (isFunction(depth)) {
    initialValue = callback;
    callback     = depth;
    depth        = 1;
  }

  if (depth === 1) {
    out = reduceKV(object, callback, initialValue);
  }
  else {
    /*jslint unparam: true */
    out = reduceKV(object, function(memo, key, value) {
      var newValue = deepReduceKV(value, depth - 1, callback, initialValue);
      return callback(memo, key, newValue, object);
    }, initialValue);
    /*jslint unparam: false */
  }

  return out;
};

module.exports = deepReduceKV;
