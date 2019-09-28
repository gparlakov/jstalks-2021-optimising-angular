/** as the webpack bundler bundles all the locales and we only use the 4
 * - remove the rest from node modules in order to remove them from the built bundle*/

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

/**
 *  add locales to this array to keep them after `npm install` (see https://github.com/moment/moment/tree/develop/src/locale for list of all supported locales)
 */
var keep = ['ru.js'];

var locales = fs.readdirSync(path.join(__dirname, '..', 'node_modules', 'moment', 'locale'));

locales.forEach(l => {
  if (!keep.includes(l)) {
    try {
      fs.unlinkSync(path.join(__dirname, '..', 'node_modules', 'moment', 'locale', l));
    } catch (ex) {
      console.warn(chalk.red('could not remove ', l, ex));
    }
  } else {
    console.log(chalk.yellow('Leaving locale', l));
  }
});
