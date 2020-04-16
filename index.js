var cloner = (function (exports) {
  'use strict';

  var ownKeys = function (Object) {
    try {
      return Reflect.ownKeys;
    } catch (IE) {
      var gOPNs = Object.getOwnPropertyNames;
      var gOPSs = Object.getOwnPropertySymbols;
      return function (object) {

        return gOPNs(object).concat(gOPSs ? gOPSs(object) : []);
      };
    }
  }(Object);

  var create = Object.create,
      defineProperty = Object.defineProperty,
      getPrototypeOf = Object.getPrototypeOf,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  var clone = function clone(source) {
    var target = create(getPrototypeOf(source));
    ownKeys(source).forEach(function (key) {
      var descriptor = getOwnPropertyDescriptor(source, key);
      var value = descriptor.value;

      if (value) {
        switch (true) {
          case value instanceof Date:
            descriptor.value = new Date(+value);
            break;

          case value instanceof RegExp:
            descriptor.value = new RegExp(value.source, value.flags);
            break;

          case value instanceof Object:
            if (typeof value !== 'function') descriptor.value = clone(value);
            break;
        }
      }

      defineProperty(target, key, descriptor);
    });
    return target;
  };

  exports.default = clone;

  return exports;

}({}).default);
