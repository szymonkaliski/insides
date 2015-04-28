var keysFromArg = require("./keys-from-arg");
var updateIn    = require("./update-in");

module.exports = function(mappings) {
  mappings   = mappings || [];
  var object = {};

  mappings.forEach(function(mapping) {
    var keys  = keysFromArg(mapping[0]);
    var value = mapping[1];

    object = updateIn(object, keys, value);
  });

  return object;
};
