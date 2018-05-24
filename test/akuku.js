var assert = require('assert');
var akuku = require('../');

describe('akuku', function () {
  it('measure time and count', function (done) {
    let tm = akuku('test ABC');

    tm.start();

    assert.ok(tm.toObject().activeNow, 'should be active after start');

    setTimeout(function() {
      tm.stop();

      let { counter } = tm.toObject();
      assert.equal(counter, 1);

      tm.start(undefined, 3);

      setTimeout(function() {
        tm.stop();


        let { activeNow, active, counter } = tm.toObject();
        assert.ok(!activeNow);
        assert.equal(active[0], 0, 'not even a second elapsed');
        assert(active[1] > 50 * 1e6, 'some nanos must have elapsed');
        assert.equal(counter, 4);

        assert.equal(tm.toString(), '4 test ABC: 0 hours 0 minutes 0 seconds');

        done();
      }, 37);
    }, 25);

  });

  it('should wrap next', function(done) {
    let tm = akuku('test BCD');

    function next() {
      done();
    }

    let fn = tm.start(next);
    setTimeout(fn, 22);

  });


});
