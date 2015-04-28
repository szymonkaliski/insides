var isFunction = require("./is-function");
var isObject   = require("./is-object");

var eachKV = function(object, callback) {
  if (isObject(object)) {
    Object.keys(object).forEach(function(key) {
      callback(key, object[key], object);
    });
  }
};

var deepEachKV = function(object, depth, callback) {
  if (isFunction(depth)) {
    callback = depth;
    depth    = 1;
  }

  if (depth === 1) {
    eachKV(object, callback);
  }
  else {
    /*jslint unparam: true */
    eachKV(object, function(_, value) {
      deepEachKV(value, depth - 1, callback);
    });
    /*jslint unparam: false */
  }
};

module.exports = deepEachKV;
