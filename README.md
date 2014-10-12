# transform-keys

Recursively transform object keys with a custom key transform strategy

## Usage

```js
var transform = require("transform-keys"); 

var snake = {
  a_snake_cased_key: {
    foo_bar_baz: "qux",
    null_value: null,
    numbers: [1, 2, 3, 4]
  }
};

var transformed = transform(snake, function (key) {
  return key.replace(/_([a-z])/ig, function (_, $1) {
    return $1.toUpperCase();
  });
});

assert.deepEqual(transformed, {
  aSnakeCasedKey: {
    fooBarBaz: "qux",
    nullValue: null,
    numbers: [1, 2, 3, 4]
});

```

### Custom key transformers

```js
var transform = require("transform-keys"); 

var camelify = transform(function (key) {
  return key.replace(/_([a-z])/ig, function (_, $1) {
    return $1.toUpperCase();
  });
});

var snakeify = transform(function (key) {
  return key.replace(/([A-Z])/g, function (_, $1) {
    return '_'+$1.toLowerCase();
  });
});

var snake = {
  a_snake_cased_key: {
    foo_bar_baz: "qux",
    null_value: null,
    numbers: [1, 2, 3, 4]
  }
};

var camel = {
  aSnakeCasedKey: {
    fooBarBaz: "qux",
    nullValue: null,
    numbers: [1, 2, 3, 4]
  }
};


assert.deepEqual(camelify(snake), camel);
assert.deepEqual(snakeify(camel), snake);

```
