var assert = require('assert');
var counters = require('../lib/counters');

describe('counter', function () {
  it('must count', function () {
    let c = counters();
    let countA = c.add('A');
    let countB = c.add('B');

    countA();

    assert.equal(c.toString(), '1 A\n0 B');
    assert.deepEqual(c.toObject(), { A: 1, B: 0 });

    countB();
    countA(3);

    assert.equal(c.toString(), '4 A\n1 B');
    assert.deepEqual(c.toObject(), { A: 4, B: 1 });
  });
});
