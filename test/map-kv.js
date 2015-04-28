var test  = require("tape");
var mapKV = require("../").mapKV;

test("map over simple object", function(t) {
  var testObject = {
    a: 2,
    b: 3,
    c: 5
  };

  var object;

  object = mapKV(testObject, function(key, value) {
    return value * 2;
  });
  t.deepEqual(object, { a: 4, b: 6, c: 10 });

  object = mapKV(testObject, function(key) {
    return key;
  });
  t.deepEqual(object, { a: "a", b: "b", c: "c" });

  t.end();
});

test("map over deep object", function(t) {
  var testObject = {
    a: { b: 2 },
    c: { b: 3 },
    e: { f: 4 },
    g: 3
  };

  var object;

  object = mapKV(testObject, 2, function(key, value) {
    return value * 2;
  });
  t.deepEqual(object, { a: { b: 4 }, c: { b: 6 }, e: { f: 8 }, g: 3 });

  t.end();
});
