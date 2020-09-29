#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .on('--help', function () {
    console.log('');
    console.log(chalk.gray('Examples:'));
    console.log(chalk.cyan('  $ ') + 'translate sad');
    console.log(chalk.cyan('  $ ') + 'translate 伤心 en');
    console.log(chalk.cyan('  $ ') + 't 难过 ko');
    console.log('');
  })
  .parse(process.argv);

let [text, to] = process.argv.slice(2);
if (!text) {
  program.outputHelp();
}

if (!to) {
  to = /^[a-zA-Z0-9 ,.;""''?!]+$/.test(text) ? 'zh-Hans' : 'en';
}

require('../src/cli').run(text, to);
