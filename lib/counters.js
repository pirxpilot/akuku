const { formatCounters } = require('./tools');

module.exports = makeCounter;

function makeCounter() {
  const counters = [];
  const labels = [];

  function add(label) {
    const index = counters.length;
    labels[index] = label;
    counters[index] = 0;

    return function count(c = 1) {
      counters[index] += c;
    };
  }

  function toString() {
    return formatCounters(toObject());
  }

  function toObject() {
    const obj = {};
    for (let i = 0; i < counters.length; i++) {
      obj[labels[i]] = counters[i];
    }
    return obj;
  }

  function empty() {
    return counters.length === 0;
  }

  return {
    add,
    empty,
    toString,
    toObject
  };
}
