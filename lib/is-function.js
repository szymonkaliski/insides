module.exports = function(object) {
  return !!(object && object.constructor && object.call && object.apply);
};
