var test = require("tap").test;

var transform = require("./"); 

test('inline transform', function(t) {
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
  t.deepEqual(transformed, {
    aSnakeCasedKey: {
      fooBarBaz: "qux",
      nullValue: null,
      numbers: [1, 2, 3, 4]
    }
  });
  t.end();
});


test('create custom transform functions', function(t) {
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

  var now = new Date();

  function func() {}

  var snakeKeys = {
    foo_bar_baz: "qux",
    foo_bar_42: "42",
    "foo_bar-42": "42",
    foo_func: func,
    foo: {
      bar_baz: "qux",
      qux: null,
      arr: [1, 2, 3, 4]
    },
    date: now
  };

  var camelKeys =   {
    fooBarBaz: "qux",
    fooBar_42: "42",
    "fooBar-42": "42",
    fooFunc: func,
    foo: {
      barBaz: 'qux',
      qux: null,
      arr: [1, 2, 3, 4]
    },
    date: now
  };

  t.deepEqual(
    camelify(snakeKeys),
    camelKeys
  );

  t.deepEqual(
    snakeify(camelKeys),
    snakeKeys
  );
  t.end();
});

