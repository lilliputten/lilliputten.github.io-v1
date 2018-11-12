/* eslint-env es6, node, commonjs */
/* eslint-disable no-console */
/**
 * @module package-npm-commands-help.js
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Printing out all npm script commands
 * @since 2018.10.29, 04:42
 * @version 2018.11.04, 20:15
 */

const PROJECT = require('./package.json');
const commands = PROJECT.scripts;
const keys = Object.keys(commands);
const chalk = require('chalk');
console.info('\nUsage: ' + chalk.underline(' npm run -s <cmd>') + '\n');
keys
  .filter((key) => !(key.endsWith('UNUSED') || key.endsWith('SAMPLE')))
  .map((key) => {
    let s = '  ' + chalk.green(key);
    const cmd = commands[key];
    const reg = cmd && cmd.match(/echo --(.*?)--/);
    if (reg && reg[1]) {
      s += ': ' + reg[1];
      console.info(s);
    }
  })
;

