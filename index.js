const akuku = require('./lib/akuku');
const dummy = require('./lib/dummy');

module.exports = checkEnvironment() ? akuku : dummy;

function checkEnvironment() {
  let env = process.env.AKUKU;
  if (!env) {
    return false;
  }
  switch (env.toLowerCase()) {
    case '1':
    case 'on':
    case 'true':
      return true;
  }
  return false;
}
