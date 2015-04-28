module.exports = function(key) {
  var keys;

  if (key instanceof Array)       { keys = key; }
  else if (!isNaN(key))           { keys = [ key ]; }
  else if (key.indexOf(".") >= 0) { keys = key.split("."); }
  else                            { keys = [ key ]; }

  return keys;
};
