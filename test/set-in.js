var test  = require("tape");
var setIn = require("../").setIn;

test("set-in differs from update-in", function(t) {
  var testObject = {
    a: { b: { c: 3, d: 5 } },
    d: [ 0, 2, { f: 4, h: 10 } ]
  };

  var object;

  object = setIn(testObject, [ "a", "b" ], { c: 4 });
  t.deepEqual(object, { a: { b: { c: 4 } }, d: [ 0, 2, { f: 4, h: 10 } ] });

  object = setIn(testObject, [ "d", 2 ], function(key, value) {
    return "here was value (" + value.f + ") for key: " + key;
  });
  t.deepEqual(object, { a: { b: { c: 3, d: 5 } }, d: [ 0, 2, "here was value (4) for key: 2" ] });

  t.end();
});
