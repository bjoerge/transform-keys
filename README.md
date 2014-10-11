# Key-trans

Recursively transform object keys with a custom key transform strategy

## Example


### Alternative 1

```js
var transform = require("key-transform"); 

var snake = {
  a_snake_cased_key: {
    foo_bar_baz: "qux",
    null_value: null,
    numbers: [1, 2, 3, 4]
  }
};

var transformed = transform(snake, function (key) {
  return key.replace(/_([a-z]{1})/ig, function (_, $1) {
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

### Create custom key transformers

```js
var transform = require("key-transform"); 

var camelify = transform(function (key) {
  return key.replace(/_([a-z]{1})/ig, function (_, $1) {
    return $1.toUpperCase();
  });
});

var snakeify = transform(function (key) {
  return key.replace(/([A-Z]{1})/g, function (_, $1) {
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