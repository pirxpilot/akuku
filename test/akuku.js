const test = require('node:test');
const assert = require('node:assert/strict');
const akuku = require('../lib/akuku');

test('measure time and count', function (_, done) {
  let tm = akuku('test ABC');

  tm.start();

  assert.ok(tm.toObject().activeNow, 'should be active after start');

  setTimeout(function () {

    tm.stop();

    let { counter } = tm.toObject();
    assert.equal(counter, 1);

    tm.start(undefined, 3);

    setTimeout(function () {
      tm.stop();

      let { activeNow, active, counter } = tm.toObject();

      assert.ok(!activeNow);
      assert.equal(active[0], 0, 'not even a second elapsed');
      assert.ok(active[1] > 50 * 1e6, 'some nanos must have elapsed');
      assert.equal(counter, 4);
      assert.ok(/\s+4 test ABC\s+0 hours 0 minutes 0 seconds/.test(tm.toString()));

      done();
    }, 37);
  }, 25);

});

test('should wrap next', function (_, done) {

  let tm = akuku('test BCD');

  function next() {
    assert.ok(true);
    done();
  }

  let fn = tm.start(next);
  setTimeout(fn, 22);
});
