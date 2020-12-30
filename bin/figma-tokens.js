#!/usr/bin/env node
/* eslint no-console:0 */
const program = require('commander')
const {version} = require('../package.json')

program.version(version, '-v, --version', 'output the current version')

program.command('build', 'generate all design tokens files')
program.command(
  'api',
  'connect to Figma API an generate design tokens JSON file'
)

program.parse(process.argv)
