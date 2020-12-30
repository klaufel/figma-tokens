const {getTokens, camelCase, genShadow} = require('../utils')

const getShadows = (layerName, stylesArtboard) => {
  const palette = {shadow: {}}
  const decorator = element => {
    const {name} = element
    const {color, offset, radius} = element.effects[0]
    const tokens = {
      [camelCase(name)]: {value: genShadow(color, offset, radius)}
    }
    Object.assign(palette.shadow, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}

module.exports = getShadows
