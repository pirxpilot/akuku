module.exports = makeDummy;

const dummy = {
  start: pass,
  stop: noop,
  toString: () => '',
  toObject: noop,
  next: pass,
  dump: noop,
  counter: () => noop
};

function makeDummy() {
  return dummy;
}

function noop() {}
function pass(next) { return next; }
