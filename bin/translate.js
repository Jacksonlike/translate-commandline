#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

program
  .version(require('../package').version)
  .usage('<word> [translate word into] [options]')
  .on('--help', function () {
    console.log('');
    console.log(chalk.gray('Examples:'));
    console.log(chalk.cyan('  $ ') + 'translate sad');
    console.log(chalk.cyan('  $ ') + 'translate 伤心 en');
    console.log(chalk.cyan('  $ ') + 't sad ko');
    console.log('');
  })
  .parse(process.argv);

let [text, to] = process.argv.slice(2);
if (!text) {
  program.outputHelp();
  process.exit(1);
}

if (!to) {
  to = /^[a-zA-Z0-9 ,.;""''?!]+$/.test(text) ? 'zh-Hans' : 'en';
}

require('../src/cli').run(text, to);
