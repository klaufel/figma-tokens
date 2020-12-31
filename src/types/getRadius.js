const {getTokens, camelCase} = require('../utils')

const getRadius = (layerName, stylesArtboard) => {
  const palette = {radius: {}}
  const decorator = element => {
    const {name} = element
    const {cornerRadius} = element.children[0]
    const tokens = {
      [camelCase(name)]: `${cornerRadius}px`
    }
    Object.assign(palette.radius, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}

module.exports = getRadius
