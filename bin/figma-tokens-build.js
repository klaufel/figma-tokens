#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const {camelCase, kebabCase} = require('../src/utils')

const DESIGN_TOKENS_FILE = path.join(process.cwd(), '.', 'tokens/tokens.json')

const toCSSWrapper = children => `:root {\n${children}}\n`
const toCSS = ({prefix, property, value}) =>
  `  --${kebabCase(`${prefix}-${property}`)}: ${value};\n`

const toSCSSWrapper = children => `${children}`
const toSCSS = ({prefix, property, value}) =>
  `$${kebabCase(`${prefix}-${property}`)}: ${value};\n`

const toLESSWrapper = children => `${children}`
const toLESS = ({prefix, property, value}) =>
  `@${kebabCase(`${prefix}-${property}`)}: ${value};\n`

const toJSWrapper = children => `${children}`
const toJS = ({prefix, property, value}) =>
  `export const ${camelCase(`${prefix}-${property}`)} = '${value}'\n`

const OUPUT_FILE_FORMATS = {
  css: [toCSSWrapper, toCSS],
  js: [toJSWrapper, toJS],
  less: [toLESSWrapper, toLESS],
  scss: [toSCSSWrapper, toSCSS]
}

const printDate = format =>
  `/* ${format.toUpperCase()} file automatically generated on ${new Date().toLocaleString()} */\n\n`

try {
  if (!fs.existsSync(DESIGN_TOKENS_FILE)) {
    console.log('\x1b[31m\n\n❌ Design tokens file not found!\n\n')
    process.exit(0)
  }

  fs.readFile(DESIGN_TOKENS_FILE, 'utf8', (err, data) => {
    if (err) throw err

    console.log('🚀 Generating design tokens files...\n')

    const dataObject = JSON.parse(data)

    const tokensLayers = Object.keys(dataObject)

    const layers = tokensLayers.map(layer =>
      Object.keys(dataObject[layer]).map(property => ({
        prefix: layer,
        property,
        value: dataObject[layer][property]
      }))
    )

    Object.keys(OUPUT_FILE_FORMATS).map(format => {
      const [wrapper, properties] = OUPUT_FILE_FORMATS[format]
      const flatObject = obj => (format !== 'json' ? obj.join('') : obj)
      const styles = flatObject(
        layers.map(
          layer => `${flatObject(layer.map(values => properties(values)))}\n`
        )
      )

      const contentToFormat =
        (format !== 'json' ? printDate(format) : '') + wrapper(styles)

      fs.writeFile(`tokens/tokens.${format}`, contentToFormat, err => {
        if (err) throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
        console.log(
          `\x1b[32m✔︎\x1b[0m ${format.toUpperCase()} design tokens file generated!`
        )
      })
    })
  })
} catch (err) {
  if (err) throw err
}
