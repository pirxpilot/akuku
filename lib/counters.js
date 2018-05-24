const { formatCounters } = require('./tools');

module.exports = makeCounter;

function makeCounter() {
  let counters = [];
  let labels = [];

  function add(label) {
    let index = counters.length;
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
    let obj = {};
    for(let i = 0; i < counters.length; i++) {
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
