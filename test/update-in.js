var test     = require("tape");
var updateIn = require("../").updateIn;

test("simple update-in", function(t) {
  var testObject = {
    a: 1,
    b: 2
  };

  var object;

  object = updateIn(testObject, "a", 3);
  t.deepEqual(object, { a: 3, b: 2 });

  object = updateIn(testObject, "a", function(key, value) {
    return value * 5;
  });
  t.deepEqual(object, { a: 5, b: 2 });

  t.end();
});

test("complicated update-in", function(t) {
  var testObject = {
    a: { b: { c: 3, d: 5 } },
    d: [ 0, 2, { f: 4 } ]
  };

  var object;

  object = updateIn(testObject, [ "a", "b", "c" ], 4);
  t.deepEqual(object, { a: { b: { c: 4, d: 5 } }, d: [ 0, 2, { f: 4 } ] });

  object = updateIn(testObject, [ "d", 2, "f" ], function(key, value) {
    return "here was value (" + value + ") for key: " + key;
  });
  t.deepEqual(object, { a: { b: { c: 3, d: 5 } }, d: [ 0, 2, { f: "here was value (4) for key: f" } ] });

  t.end();
});

test("update-in with arrays", function(t) {
  var testObject = {};

  testObject = updateIn(testObject, [ "a", "b" ], function(key, value) {
    return value ? value.push(1) : value = [ 1 ];
  });

  testObject = updateIn(testObject, [ "a", "b" ], function(key, value) {
    return value ? value.push(2) : value = [ 2 ];
  });

  t.deepEqual(testObject, { a: { b: [ 1, 2 ] } });

  t.end();
});
