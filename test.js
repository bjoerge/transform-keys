var test = require("tap").test;

var transform = require("./");

test('inline transform', function (t) {
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
  t.deepEqual(transformed, {
    aSnakeCasedKey: {
      fooBarBaz: "qux",
      nullValue: null,
      numbers: [1, 2, 3, 4]
    }
  });
  t.end();
});


test('create custom transform functions', function (t) {
  var camelify = transform(function (key) {
    return key.replace(/_([a-z])/ig, function (_, $1) {
      return $1.toUpperCase();
    });
  });

  var snakeify = transform(function (key) {
    return key.replace(/([A-Z])/g, function (_, $1) {
      return '_' + $1.toLowerCase();
    });
  });

  var now = new Date();

  function func() {
  }

  var regex = /foo/ig;

  var snakeKeys = {
    foo_bar_baz: "qux",
    foo_bar_42: "42",
    "foo_bar-42": "42",
    foo_func: func,
    foo: {
      bar_baz: "qux",
      bar_baz_regex: regex,
      qux: null,
      arr: [1, 2, 3, 4],
      arr_of_objects: [
        {
          foo_bar: "foo"
        },
        "some string",
        {
          another_array: [
            {
              foo_bar: "foo"
            }
          ]
        }
      ]
    },
    date: now
  };

  var camelKeys = {
    fooBarBaz: "qux",
    fooBar_42: "42",
    "fooBar-42": "42",
    fooFunc: func,
    foo: {
      barBazRegex: regex,
      barBaz: 'qux',
      qux: null,
      arr: [1, 2, 3, 4],
      arrOfObjects: [
        {
          fooBar: "foo"
        },
        "some string",
        {
          anotherArray: [
            {
              fooBar: "foo"
            }
          ]
        }
      ]
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

