module.exports = {
  addNanos,
  toHuman,
  formatCounters,
  formatTiming
};

const NANO_IN_SEC = 1e9;

function addNanos(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  if (a[1] > NANO_IN_SEC) {
    a[0] += 1;
    a[1] -= NANO_IN_SEC;
  }
  return a;
}

function toSeconds(nanos) {
  let seconds = nanos[0];
  if (nanos[1] > NANO_IN_SEC / 2) {
    seconds += 1;
  }
  return seconds;
}

function toHuman(nanos) {
  let seconds = toSeconds(nanos);
  let intervals = [0, 0, 0];

  for (let i = 0; i < intervals.length; i++) {
    intervals[i] = seconds % 60;
    seconds -= intervals[i];
    seconds /= 60;
  }

  return `${intervals[2]} hours ${intervals[1]} minutes ${intervals[0]} seconds`;
}


const NUMBER_LEN = Number.MAX_SAFE_INTEGER.toString().length;
const NAME_LEN = 25;

function formatCounters(counters, prefix = '') {
  let strings = Object.entries(counters)
    .map(([n, v]) => `${prefix}${v.toString().padStart(NUMBER_LEN)} ${n}`);
  return strings.join('\n');
}

function formatTiming(counter, name, nanos, prefix = '') {
  let nanosStr = toHuman(nanos);
  let counterStr = counter.toString().padStart(NUMBER_LEN);
  let nameStr = name.padEnd(NAME_LEN);
  return `${prefix}${counterStr} ${nameStr} ${nanosStr}`;
}
