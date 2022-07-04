#!/usr/bin/env node

import program from 'commander'
import { version } from '../package.json'

program.version(version, '-v, --version', 'output the current version')

program.command('build', 'generate all design tokens files')
program.command('api', 'connect to Figma API an generate design tokens JSON file')

program.parse(process.argv)
