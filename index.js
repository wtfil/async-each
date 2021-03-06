// MIT license (by Paul Miller from http://paulmillr.com).
(function(globals) {
  'use strict';
  var each = function(items, next, callback) {
    if (!Array.isArray(items)) throw new TypeError('each() expects array as first argument');
    if (typeof next !== 'function') throw new TypeError('each() expects function as second argument');
    if (typeof callback !== 'function') callback = Function.prototype; // no-op

    var transformed = new Array(items.length);
    var count = 0;
    var returned = false;

    items.forEach(function(item, index) {
      var step = function(error, transformedItem) {
        if (returned) return;
        if (error) {
          returned = true;
          return callback(new Error(error));
        }
        transformed[index] = transformedItem;
        count += 1;
        if (count === items.length) return callback(undefined, transformed);
      };
      item = [].concat(item);
      item.push(step);
      next.apply(null, item);
    });
  };

  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(each); // RequireJS
  } else if (typeof module === 'object' && module.exports) {
    module.exports = each; // CommonJS
  } else {
    globals.asyncEach = each; // <script>
  }
})(this);
