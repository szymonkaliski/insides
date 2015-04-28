module.exports = {
  buildObject: require("./lib/build-object"),

  getIn:       require("./lib/get-in"),
  setIn:       require("./lib/set-in"),
  updateIn:    require("./lib/update-in"),

  eachKV:      require("./lib/each-kv"),
  mapKV:       require("./lib/map-kv"),
  reduceKV:    require("./lib/reduce-kv")
};
