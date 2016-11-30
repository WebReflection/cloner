//remove:
var cloner = require('../build/cloner.node.js');
//:remove

wru.test([
  {
    name: 'main',
    test: function () {
      wru.assert('it exists', typeof cloner == 'object');
      wru.assert('it has deep', typeof cloner.deep == 'object');
      wru.assert('it has shallpw', typeof cloner.shallow == 'object');
      wru.assert('it has deep methods', typeof cloner.deep.copy == 'function' && typeof cloner.deep.merge == 'function');
      wru.assert('it has shallow methods', typeof cloner.shallow.copy == 'function' && typeof cloner.shallow.merge == 'function');
    }
  }, {
    name: 'shallow.copy',
    test: function () {
      var a = {a: 1, b: {c: 'd'}};
      var b = cloner.shallow.copy(a);
      wru.assert('it did copy a', b.a === a.a);
      wru.assert('it did copy b', b.b === a.b);
      a.f = a;
      var b = cloner.shallow.copy(a);
      wru.assert('it did not have problems with recursion',
        b.a === a.a &&
        b.b === a.b &&
        b.f === a.f
      );
    }
  }, {
    name: 'shallow.merge',
    test: function () {
      var a = {a: 1, b: {c: 'd'}};
      var b = cloner.shallow.merge({}, a);
      wru.assert('it did copy a', b.a === a.a);
      wru.assert('it did copy b', b.b === a.b);
      a.f = a;
      cloner.shallow.merge(b, a);
      wru.assert('it did not have problems with recursion',
        b.a === a.a &&
        b.b === a.b &&
        b.f === a.f
      );
      var a = {a: 1, b: 2};
      var b = cloner.shallow.merge({a: 3}, a);
      wru.assert('it did not have problems with already available properties',
        b.a === 1 &&
        b.b === 2
      );
      var a = {a: 1, b: 2};
      var b = {b: 3};
      var c = {c: 4};
      var d = cloner.shallow.merge({}, a, b, c);
      wru.assert('it did not have problems with already available properties',
        d.a === 1 &&
        d.b === 3 &&
        d.c === 4
      );
    }
  }, {
    name: 'deep.copy',
    test: function () {
      var a = {a: 1, b: {c: 'd'}};
      var b = cloner.deep.copy(a);
      wru.assert('it did copy a', b.a === 1);
      wru.assert('it did copy b', b.b.c === 'd');
      wru.assert('but objects are not the same', a.b !== b.b);
      a.f = a;
      a.g = a;
      var b = cloner.deep.copy(a);
      wru.assert('it did not have problems with recursion',
        b.a === 1 &&
        b.b.c === 'd' &&
        a.b !== b.b &&
        a.f !== b.f &&
        b.f === b.g &&
        b.f.f === b.f &&
        b.f.g.f === b.g &&
        b.f.g.f.g.f.g === b
      );
    }
  }, {
    name: 'deep.merge',
    test: function () {
      var a = {a: {a: 1, get e(){ return true; }}, b: {b: 2}, c: 4};
      var b = cloner.deep.merge({a: {c: 3}}, a);
      wru.assert('it did merge deeply',
        a.a !== b.a &&
        a.b !== b.b &&
        b.a.a === 1 &&
        b.a.c === 3 &&
        b.b.b === 2 &&
        b.c === 4
      );
      var b = cloner.deep.merge({a: {a: 0, get e(){ return false; }, c: 3}, b: {b: 1}, c: 2}, a);
      wru.assert('it did merge over existing properties',
        a.a !== b.a &&
        a.b !== b.b &&
        b.a.a === 1 &&
        b.a.c === 3 &&
        b.b.b === 2 &&
        b.c === 4 &&
        b.a.e === true
      );
      a.f = a;
      var b = cloner.deep.merge({a: {c: 3}}, a);
      wru.assert('it works with recursion too',
        a.a !== b.a &&
        a.b !== b.b &&
        b.a.a === 1 &&
        b.a.c === 3 &&
        b.b.b === 2 &&
        b.f === b
      );
    }
  }, {
    name: "Array serialized as Array",
    test: function () {
      wru.assert(
        'Array are preserved',
        JSON.stringify(cloner.deep.copy({array:[1,{array:[2]}]})) === '{"array":[1,{"array":[2]}]}'
      );
    }
  }
]);
