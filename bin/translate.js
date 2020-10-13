#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

const args = program
  .version(require('../package').version)
  .alias('t')
  .usage('<word> [translate word into] [options]')
  .option('-p, --pronunciation', 'autoplay English pronunciation', false)
  .on('--help', function () {
    console.log('');
    console.log(chalk.gray('Examples:'));
    console.log(chalk.cyan('  $ ') + 'translate sad -p');
    console.log(chalk.cyan('  $ ') + 'translate 伤心 en');
    console.log(chalk.cyan('  $ ') + 't sad ko');
    console.log('');
  })
  .parse(process.argv);

let [text, to] = process.argv
  .slice(2)
  .filter((item) => !['--pronunciation', '-p'].includes(item));
if (!text) {
  program.outputHelp();
  process.exit(1);
}

if (!to) {
  to = /^[a-zA-Z0-9 ,.;""''?!]+$/.test(text) ? 'zh-Hans' : 'en';
}

require('../src/cli').run(text, to, args.pronunciation);
