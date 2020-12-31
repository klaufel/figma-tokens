/* eslint-disable no-console */
const fs = require('fs')
const genTokens = require('./gen')
const path = require('path')

const CONFIG_FIGMA_FILE = path.join(process.cwd(), '.', 'config.figma.json')

function figmaApi() {
  try {
    fs.access(CONFIG_FIGMA_FILE, fs.F_OK, err => {
      if (err) throw err
      fs.readFile(CONFIG_FIGMA_FILE, 'utf8', (err, data) => {
        if (err) throw err
        const {FIGMA_APIKEY, FIGMA_ID} = JSON.parse(data)
        const FIGMA_OUTDIR = 'tokens'

        if (!FIGMA_APIKEY) {
          console.log('\x1b[31m\n\n❌ No FIGMA_PERSONAL_TOKEN found!\n\n')
          process.exit(0)
        } else if (!FIGMA_ID) {
          console.log('\x1b[31m\n\n❌ No FIGMA_ID found!\n\n')
          process.exit(0)
        } else {
          if (!FIGMA_OUTDIR)
            // eslint-disable-next-line no-console
            console.warn(
              '⚠️ No outdir found, default outdir is `./tokens.json`'
            )

          genTokens(FIGMA_APIKEY, FIGMA_ID, FIGMA_OUTDIR)
        }
      })
    })
  } catch {
    throw new Error(
      '\x1b[31m\n\n❌ Config file was not found!\n\nPlease, create a `config.figma.json` in the root folder with the FIGMA_APIKEY and FIGMA_ID keys\n\n'
    )
  }
}

module.exports = figmaApi
