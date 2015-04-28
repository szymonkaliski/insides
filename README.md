# Insides

Small JavaScript utility library for working with nested objects.

## Installation

```
npm install insides --save
```

## Quick Examples

```javascript
  var buildObject = require("insides").buildObject;
  var reduceKV    = require("insides").reduceKV;

  var object = buildObject([
    [ [ "a", "b", "c" ], 1 ],
    [ [ "a", "b", "d" ], 2 ],
    [ [ "e" ], 3 ]
  ]);

  console.log(JSON.stringify(object, null, 2));
  // {
  //   "a": {
  //     "b": {
  //       "c": 1,
  //       "d": 2
  //     }
  //   },
  //   "e": 3
  // }

  var depth = 3;
  var sum = reduceKV(object, depth, function(memo, key, value) {
    return memo + value;
  }, 0);

  console.log("sum: " + sum);
  // sum: 3

  var abcValue = getIn(object, [ "a", "b", "c" ]);

  console.log("abc value: " + abcValue);
  // abc value: 1

  var abgValue = getIn(object, [ "a", "b", "g" ], "not found");

  console.log("abg value: " + abgValue);
  // abg value: not found

  var newObject = setIn(object, [ "a", "b", "g" ], 10);
  var newAbgValue = getIn(newObject, [ "a", "b", "g" ], "not found");

  console.log("new abg value: " + newAbgValue);
  // new abg value: 10
```

## Functions

### buildObject(objectMap)

Creates object from nestedArray:

```javascript
objectMap = [ [ "a", 2 ] ]; // => { a: 2 }

objectMap = [ [ [ "a", "b" ], 2 ] ]; // => { a: { b: 2 } }

objectMap = [ 
  [ [ "a", "b" ], 2 ],
  [ [ "a", "c" ], 3 ]
]; // => { a: { b: 2, c: 3 } }
```

Argument is array of two-element arrays, first element is key map for the value, and second argument is the value;

### getIn(object, keys, [notFound])

Returns value from nested object.

__Arguments__

* `object` - object from which to return value
* `keys` - keys array, could be a string or a array of keys: `"a"`, `[ "a", "b" ]` or `"a.b"`
* `notFound` - optional not found value, defaults to `undefined`

Differences from `object.a.b.c`: 

If `object.a` does not exists this will thor a `TypeError`, `getIn(object, [ "a", "b", "c" ])` returns `undefined`.

### setIn(object, keys, value/callback);

Sets value in object for provided keys array. Overwrites everything that was in this key.

__Arguments__

* `object` - object to update value
* `keys` - keys array, could be a string or a array of keys: `"a"`, `[ "a", "b" ]` or `"a.b"`
* `value/callback` - value or a callback to update the object:
  * `value` - overwrites object at given keys to provided value
  * `callback` - calls `callback(key, value)` and replaces object at given key path to return value of the callback

### updateIn(object, keys, value/callback);

The same as `setIn` but updates the values instead of replacing them:

```javascript
var object = { "a": { "b": 3, "c": 2 } };

var setObject = setIn(object, [ "a" ], { b: 5 });
// => { "a": { "b": 5 } }

var updateObject = setIn(object, [ "a" ], { b: 5 });
// => { "a": { "b": 5, "c": 2 } }

```

### eachKV(object, [depth], callback)

Iterates over object calling callback on each matching value.

__Arguments__

* `object` - object to iterate on
* `[depth]` - optional depth argument, positive integer, defaults to 0
* `callback` - callback to be run on every matching node: `callback(key, value, object)`

### mapKV(object, [depth], callback)

Same as `eachKV` but returns new object instead of updating existing one.

### reduceKV(object, [depth], callback, [initialValue])

Reduces nested object using provided callback.

__Arguments__

* `object` - object to reduce
* `[depth]` - optional depth argument, positive integer, defaults to 0
* `callback` - callback to be run on every matching node: `callback(memo, key, value, object)`
* `[initialValue]` - optional initial value for first `memo` in `callback`

