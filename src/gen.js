/* eslint-disable no-console */
const fs = require('fs')
const ora = require('ora')
const fetch = require('node-fetch')
const {
  getColors,
  getTypography,
  getSpacing,
  getShadows,
  getBreakpoints,
  getRadius
} = require('./types')

const emojis = {
  color: '🎨',
  typography: '🖋 ',
  spacing: '📐',
  shadow: '🌚',
  breakpoint: '🍪',
  radius: '🌀'
}

const genFile = (name, tokens, outDir) =>
  fs.writeFile(
    `${outDir}/${name}.json`,
    JSON.stringify(tokens, null, 2),
    err => {
      if (err) throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
      console.log(`\x1b[32m ${emojis[name]} ${name} tokens created!\x1b[0m`)
    }
  )

const genTokens = (apikey, id, outDir) => {
  // eslint-disable-next-line no-console
  const spinner = ora('🚀 Connecting with Figma...\n').start()

  const FETCH_PATH = 'https://api.figma.com/v1/files'
  const FETCH_URL = `${FETCH_PATH}/${id}`
  const FETCH_DATA = {
    method: 'GET',
    headers: {
      'X-Figma-Token': apikey
    }
  }

  try {
    fetch(FETCH_URL, FETCH_DATA)
      .then(response => {
        spinner.text = '🚀 Generating Figma design tokens...\n'
        return response.json()
      })
      .then(styles => {
        if (styles.status !== 403 && styles.status !== 404) {
          const figmaTree = styles.document.children[0].children

          genFile('color', getColors('Colors', figmaTree), outDir)
          genFile('spacing', getSpacing('Spacings', figmaTree), outDir)
          genFile('typography', getTypography('Typography', figmaTree), outDir)
          genFile('shadow', getShadows('Shadows', figmaTree), outDir)
          genFile('radius', getRadius('Radius', figmaTree), outDir)
          genFile(
            'breakpoint',
            getBreakpoints('Breakpoints', figmaTree),
            outDir
          )

          spinner.stop()
        }
      })
      .catch(err => {
        throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
      })
  } catch (err) {
    throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
  }
}

module.exports = genTokens
