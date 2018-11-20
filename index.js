(function (global) {
  const modules = {};
  const require = memoize(function require(name) {
    const module = {
      exports: {},
    };
    if (name in modules) {
      const returnValue = modules[name].call(module, module.exports, module);
      return (typeof returnValue === "undefined") ?
        module.exports :
        returnValue;
    } else {
      throw new Error(`require("${name}"): no module found`);
    }
  });

  function define(name, fn) {
    switch (typeof fn) {
      case "function": {
        modules[name] = fn;
        return;
      }
      default: {
        throw new Error(`Second parameter to define() must be a function`);
        return;
      }
    }
  }

  // enable require.define("module", ...)
  require.define = define;

  /*
   * Adapted from memoize.js by @philogb, @addyosmani, @mathias, and
   * @DmitryBaranovsk
   * perf tests: http://bit.ly/q3zpG3
   * Released under an MIT license.
   */
  function memoize(fn) {
    return function () {
      const args = Array.from(arguments);
      const hash = hashArgs(args);
      fn.memoize = fn.memoize || {};
      return (hash in fn.memoize) ?
        fn.memoize[hash] :
        fn.memoize[hash] = fn.apply(this, args);
    };
  }

  function hashArgs(args) {
    return Array.from(args).map(arg => {
      return (arg === Object(arg)) ?
        JSON.stringify(arg) :
        arg;
    }).join("");
  }

  global.require = require;
  global.define = define;
})(this);
