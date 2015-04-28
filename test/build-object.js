var test        = require("tape");
var buildObject = require("../").buildObject;

test("simple object", function(t) {
  var object = buildObject([
    [ [ "a" ], 1 ]
  ]);

  t.deepEqual(object, { a: 1 });
  t.end();
});

test("complicated object 1", function(t) {
  var object = buildObject([
    [ [ "a", "b", "c" ], 1 ],
    [ [ "a", "b", "d" ], 2 ],
    [ [ "e" ], 3 ]
  ]);

  t.deepEqual(object, { a: { b: { c: 1, d: 2 } }, e: 3 });
  t.end();
});

test("complicated object 2", function(t) {
  var object = buildObject([
    [ [ "a", "b", "c" ], { d: 2, e: 5 } ],
    [ [ "a", "b", "c", "f" ], [ 2, 3 ] ],
    [ [ "e" ], 3 ]
  ]);

  t.deepEqual(object, { a: { b: { c: { d: 2, e: 5, f: [ 2, 3 ] } } }, e: 3 });
  t.end();
});

test("empty object", function(t) {
  var object = buildObject();

  t.deepEqual(object, {});
  t.end();
});
