[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

# akuku

Small timing counter utility.
Uses `process.hrtime` to collect all time intervals between `start` and `stop`.

## Install

```sh
$ npm install --save akuku
```

## Usage

```js
let tm = require('akuku')('module name'); // kind of like debug

let countSomething = tm.counter('something');

tm.start();
// do something

countSomething();

tm.stop();

next = tm.start(next);

doSomethingAsync(function() {

  countSomething(5); // you can optionally pass a bigger counter

  next();
});

// later

tm.dump(); // will print sum of times between start and stop, and all associated counters
```


## API

### `start(next = undefined, count = 1)`

Starts counting time - returns the `stop` function. If `next` is specified returns wrapped version of `next` that
stops timer before calling next.

### `stop()`

Stops counting time.

### `toString()`

Displays formatted internal state - something like:


### `toObject()`

Raw state:

- `active` - sum of all intervals between start and stop as [ seconds, nano ] pair
- `counter` - number of times start was called
- `activeNow` - true if between start and stop when called
- `counters` - additional counters as name => values object

### `counter(name)`

Creates additional named counter.
Returns counter function, which - whenever called - will increment internal counter named `name`
Its value will become part of the state.


## License

ICS © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/akuku.svg
[npm-url]: https://npmjs.org/package/akuku

[travis-url]: https://travis-ci.com/pirxpilot/akuku
[travis-image]: https://img.shields.io/travis/com/pirxpilot/akuku.svg

[deps-image]: https://img.shields.io/david/pirxpilot/akuku.svg
[deps-url]: https://david-dm.org/pirxpilot/akuku

[deps-dev-image]: https://img.shields.io/david/dev/pirxpilot/akuku.svg
[deps-dev-url]: https://david-dm.org/pirxpilot/akuku?type=dev
