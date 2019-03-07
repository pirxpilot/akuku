const test = require('tape');
var counters = require('../lib/counters');

test('must count', function (t) {
  let c = counters();
  let countA = c.add('A');
  let countB = c.add('B');

  countA();

  t.deepEqual(c.toObject(), { A: 1, B: 0 });
  t.ok(/1 A\s+0 B/.test(c.toString()));

  countB();
  countA(3);

  t.deepEqual(c.toObject(), { A: 4, B: 1 });
  t.ok(/4 A\s+1 B/.test(c.toString()));

  t.end();
});
