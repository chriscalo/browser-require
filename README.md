# browser-require
CommonJS `require()` and `define()` functions for use in the browser without a build step

## Including

```html
<script src="//unpkg.com/@chriscalo/browser-require/index.js"></script>
```

## Usage

The simplest way to use `define()` is to return a value.

```js
define("string", () => {
  return "string";
});
```

But you can also set keys on the `exports` object (1st param).

```js
define("foo", (exports) => {
  exports.foo = "foo";
});
```

Finally, you can also return a whole new `exports` object by setting it on the `module` object (2nd param).

```js
define("bar", (exports, module) => {
  var foo = require("foo");
  module.exports = {
    bar: "bar",
    foo: foo,
  };
});
```

Then, after those modules have been defined, you can do synchronous `require()` calls.

```js
var string = require("string");
var bar = require("bar");
var foo = require("foo");

console.log("string:", string); // => string: string
console.log("bar:", bar); // => bar: { bar: "bar", foo: "foo" }
console.log("foo:", foo); // => { foo: "foo" }
```

The functions supplied to `define()` are only ever called once:

```js  
console.log(
  "test memoization:",
  string === require("string"),
  bar === require("bar"),
  foo === require("foo")
); // => test memoization: true true true
```
