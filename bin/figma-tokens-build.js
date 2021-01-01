#!/usr/bin/env node
/* eslint no-console:0 */
const fs = require('fs')
const path = require('path')
const {camelCase, kebabCase} = require('../src/utils')

const NAMING_CONVENTION = {kebabcase: kebabCase, camelcase: camelCase}

const DESIGN_TOKENS_FILE = path.join(process.cwd(), '.', 'tokens/tokens.json')

const FORMATS = {
  css: {
    decorator: ':root {\n%{children}}\n',
    naming: 'kebabcase',
    pattern: '  --%{property}: %{value};\n'
  },
  scss: {
    naming: 'kebabcase',
    pattern: '$%{property}: %{value};\n'
  },
  less: {
    naming: 'kebabcase',
    pattern: '@%{property}: %{value};\n'
  },
  js: {
    naming: 'camelcase',
    pattern: "export const %{property} = '%{value}'\n"
  }
}

const toCSSFormats = ({format, prefix, property, value}) => {
  const {pattern, naming} = FORMATS[format]
  const propertyWithPrefix = NAMING_CONVENTION[naming](`${prefix}-${property}`)
  const options = {property: propertyWithPrefix, value}

  return pattern.replace(
    new RegExp('%{([^}]+)}', 'gi'),
    match => options[match.replace(/[^\w\s]/gi, '')]
  )
}

const printDate = format =>
  `/* ${format.toUpperCase()} file automatically generated on ${new Date().toLocaleString()} */\n\n`

const contentToFormat = ({format, styles}) => {
  const {decorator} = FORMATS[format]
  return (
    printDate(format) +
    (decorator ? decorator.replace('%{children}', styles) : styles)
  )
}

const tokensDataMapper = data => {
  const dataObject = JSON.parse(data)
  const tokensLayers = Object.keys(dataObject)

  return tokensLayers.map(layer =>
    Object.keys(dataObject[layer]).map(property => ({
      prefix: layer,
      property,
      value: dataObject[layer][property]
    }))
  )
}

try {
  if (!fs.existsSync(DESIGN_TOKENS_FILE)) {
    console.log('\x1b[31m\n\n❌ Design tokens file not found!\n\n')
    process.exit(0)
  }

  fs.readFile(DESIGN_TOKENS_FILE, 'utf8', (err, data) => {
    if (err) throw err

    console.log('🚀 Generating design tokens files...\n')

    const layers = tokensDataMapper(data)

    Object.keys(FORMATS).map(format => {
      const styles = layers
        .map(
          layer =>
            `${layer
              .map(values => toCSSFormats({format, ...values}))
              .join('')}\n`
        )
        .join('')

      fs.writeFile(
        `tokens/tokens.${format}`,
        contentToFormat({format, styles}),
        err => {
          if (err) throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
          console.log(
            `\x1b[32m✔︎\x1b[0m ${format.toUpperCase()} design tokens file generated!`
          )
        }
      )
    })
  })
} catch (err) {
  if (err) throw err
}
