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
    let strings = new Array(counters.length);
    for(let i = 0; i < strings.length; i++) {
      strings[i] = `${counters[i]} ${labels[i]}`;
    }
    return strings.join('\n');
  }

  function toObject() {
    let obj = {};
    for(let i = 0; i < counters.length; i++) {
      obj[labels[i]] = counters[i];
    }
    return obj;
  }

  return {
    add,
    toString,
    toObject
  };
}
