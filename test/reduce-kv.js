var test     = require("tape");
var reduceKV = require("../").reduceKV;

test("reduce simple object", function(t) {
  var testObject = {
    a: 2,
    b: 3,
    c: 4
  };

  var reduced;

  reduced = reduceKV(testObject, function(memo, key, value) {
    return memo + value;
  }, 0);
  t.equal(reduced, 2 + 3 + 4);

  reduced = reduceKV(testObject, function(memo, key) {
    return memo + " " + key;
  }, "");
  t.equal(reduced, " a b c");

  t.end();
});

test("reduce deep object", function(t) {
  var testObject = {
    a: { b: 2 },
    c: { b: 3 },
    e: { f: 4 },
    g: 3
  };

  var reduced;

  reduced = reduceKV(testObject, 2, function(memo, key, value) {
    return memo + value;
  }, 0);
  t.equal(reduced, 2 + 3 + 4);

  t.end();
});
