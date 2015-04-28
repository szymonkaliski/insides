var test  = require("tape");
var getIn = require("../").getIn;

test("simple get-in", function(t) {
  var testObject = {
    a: 1,
    b: 2,
    c: { d: { e: 3 } }
  };

  var value;

  value = getIn(testObject, "a");
  t.equal(value, 1);

  value = getIn(testObject, [ "a" ]);
  t.equal(value, 1);

  t.end();
});

test("complicated get-in", function(t) {
  var testObject = {
    a: 1,
    b: 2,
    c: { d: { e: 3 } }
  };

  var value;

  value = getIn(testObject, "c.d.e");
  t.equal(value, 3);

  value = getIn(testObject, [ "c", "d", "e" ]);
  t.equal(value, 3);

  t.end();
});

test("get-in not found", function(t) {
  var testObject = {
    a: 1,
    b: 2,
    c: { d: { e: 3 } }
  };

  var value;

  value = getIn(testObject, "g");
  t.equal(value, undefined);

  value = getIn(testObject, "g.h.i");
  t.equal(value, undefined);

  value = getIn(testObject, [ "g", "h", "i" ], "nothing here");
  t.equal(value, "nothing here");

  t.end();
});
