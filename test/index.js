const cloner = require('../cjs');

const source = {plain: 'abc', re: /test/gi, date: new Date, value: [1, 2, 3], get shit() { return 'done'; }, fn() {}};
const target = cloner(source);

console.assert(target.plain === source.plain, 'plain');
console.assert(target.shit === source.shit, 'shit');
console.assert(target.fn === source.fn, 'plain');
console.assert(target.re.source === source.re.source, 'source');
console.assert(target.re.flags === source.re.flags, 'flags');
console.assert(+target.date === +source.date, 'date');
console.assert(target.value.join(',') === source.value.join(','), 'value');
console.assert(target.re !== source.re, 'no same re');
console.assert(target.date !== source.date, 'no same date');
console.assert(target.value !== source.value, 'no same value');
