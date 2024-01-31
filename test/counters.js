const test = require('node:test');
const assert = require('node:assert/strict');

const counters = require('../lib/counters');

test('must count', function () {
  let c = counters();
  let countA = c.add('A');
  let countB = c.add('B');

  countA();

  assert.deepEqual(c.toObject(), { A: 1, B: 0 });
  assert.ok(/1 A\s+0 B/.test(c.toString()));

  countB();
  countA(3);

  assert.deepEqual(c.toObject(), { A: 4, B: 1 });
  assert.ok(/4 A\s+1 B/.test(c.toString()));
});
