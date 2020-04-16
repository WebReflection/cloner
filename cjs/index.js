'use strict';
const ownKeys = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/own-keys'));

const {
  create, defineProperty,
  getPrototypeOf, getOwnPropertyDescriptor
} = Object;

const clone = source => {
  const target = create(getPrototypeOf(source));
  ownKeys(source).forEach(key => {
    const descriptor = getOwnPropertyDescriptor(source, key);
    const {value} = descriptor;
    if (value) {
      switch (true) {
        case value instanceof Date:
          descriptor.value = new Date(+value);
          break;
        case value instanceof RegExp:
          descriptor.value = new RegExp(value.source, value.flags);
          break;
        case value instanceof Object:
          if (typeof value !== 'function')
            descriptor.value = clone(value);
          break;
      }
    }
    defineProperty(target, key, descriptor);
  });
  return target;
};

module.exports = clone;
