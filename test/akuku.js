const test = require('tape');
const akuku = require('../lib/akuku');

test('measure time and count', function (t) {
  let tm = akuku('test ABC');

  t.plan(7);
  tm.start();

  t.ok(tm.toObject().activeNow, 'should be active after start');

  setTimeout(function() {

    tm.stop();

    let { counter } = tm.toObject();
    t.equal(counter, 1);

    tm.start(undefined, 3);

    setTimeout(function() {
      tm.stop();

      let { activeNow, active, counter } = tm.toObject();

      t.ok(!activeNow);
      t.equal(active[0], 0, 'not even a second elapsed');
      t.ok(active[1] > 50 * 1e6, 'some nanos must have elapsed');
      t.equal(counter, 4);
      t.ok(/\s+4 test ABC\s+0 hours 0 minutes 0 seconds/.test(tm.toString()));

    }, 37);
  }, 25);

});

test('should wrap next', function(t) {
  t.plan(1);

  let tm = akuku('test BCD');

  function next() {
    t.ok(true);
  }

  let fn = tm.start(next);
  setTimeout(fn, 22);
});
