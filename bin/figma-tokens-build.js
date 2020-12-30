#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const StyleDictionary = require('style-dictionary')

const CONFIG_FILE = path.join(process.cwd(), '.', '/config.json')

try {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(
      '\x1b[33m\n\n ⚠️ style-dictionary config was not found, using default settings!\n\nIf you need to overwrite it, create a `config.json`.\n\nSee: https://amzn.github.io/style-dictionary/#/config?id=configjson\n\n'
    )
  }
  StyleDictionary.extend({
    source: ['tokens/**/*.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'tokens/css/',
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables'
          }
        ]
      },
      scss: {
        transformGroup: 'scss',
        buildPath: 'tokens/scss/',
        files: [
          {
            destination: '_variables.scss',
            format: 'scss/variables'
          }
        ]
      },
      'json-flat': {
        transformGroup: 'web',
        buildPath: 'tokens/json-flat/',
        files: [
          {
            destination: 'variables.json',
            format: 'json/flat'
          }
        ]
      },
      js: {
        transformGroup: 'js',
        buildPath: 'tokens/js/',
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6'
          }
        ]
      },
      android: {
        transformGroup: 'android',
        buildPath: 'tokens/android/',
        files: [
          {
            destination: 'font_dimens.xml',
            format: 'android/fontDimens'
          },
          {
            destination: 'colors.xml',
            format: 'android/colors'
          }
        ]
      },
      ios: {
        transformGroup: 'ios',
        buildPath: 'tokens/ios/',
        files: [
          {
            destination: 'TokensColor.h',
            format: 'ios/colors.h',
            className: 'TokensColor',
            type: 'TokensColorName',
            filter: {
              attributes: {
                category: 'color'
              }
            }
          },
          {
            destination: 'TokensColor.m',
            format: 'ios/colors.m',
            className: 'TokensColor',
            type: 'TokensColorName',
            filter: {
              attributes: {
                category: 'color'
              }
            }
          },
          {
            destination: 'TokensSpacing.h',
            format: 'ios/static.h',
            className: 'TokensSpacing',
            type: 'float',
            filter: {
              attributes: {
                category: 'spacing'
              }
            }
          },
          {
            destination: 'TokensSpacing.m',
            format: 'ios/static.m',
            className: 'TokensSpacing',
            type: 'float',
            filter: {
              attributes: {
                category: 'spacing'
              }
            }
          }
        ]
      },
      'ios-swift': {
        transformGroup: 'ios-swift',
        buildPath: 'tokens/ios-swift/',
        files: [
          {
            destination: 'Tokens.swift',
            format: 'ios-swift/class.swift',
            className: 'Tokens',
            filter: {}
          }
        ]
      },
      'ios-swift-separate-enums': {
        transformGroup: 'ios-swift-separate',
        buildPath: 'tokens/ios-swift/',
        files: [
          {
            destination: 'TokensColor.swift',
            format: 'ios-swift/enum.swift',
            className: 'TokensColor',
            filter: {
              attributes: {
                category: 'color'
              }
            }
          },
          {
            destination: 'TokensSpacing.swift',
            format: 'ios-swift/enum.swift',
            className: 'TokensSpacing',
            type: 'float',
            filter: {
              attributes: {
                category: 'spacing'
              }
            }
          }
        ]
      }
    }
  }).buildAllPlatforms()
} catch (err) {
  if (err) throw err
}
