const { addNanos, toHuman } = require('./tools');
const makeCounters = require('./counters');

module.exports = akuku;

function akuku(name) {
  let active = [0, 0], activeFrom;
  let counter = 0;
  let counters = makeCounters();

  function start(fn, count = 1) {
    activeFrom = process.hrtime();
    counter += count;
    return next(fn);
  }

  function stop() {
    active = addNanos(active, process.hrtime(activeFrom));
    activeFrom = undefined;
  }

  function toString() {
    let activeStr = toHuman(active);
    return `${counter} ${name}: ${activeStr}`;
  }

  function toObject() {
    return {
      active,
      counter,
      activeNow: !!activeFrom,
      counters: counters.toObject()
    };
  }

  function dump() {
    console.log(toString());
    console.log(counters.toString());
  }

  function registerOnSignal() {
    process.on('SIGUSR2', function() {
      let active = activeFrom ? '+++ active' : '--- inactive';
      console.log(active + '\t' + toString());
    });
  }

  registerOnSignal();

  function next(fn) {
    if (!fn) { return stop; }
    return function() {
      stop();
      return fn();
    };
  }

  return {
    start,
    stop,
    toString,
    toObject,
    next,
    dump,
    counter: counters.add
  };
}
