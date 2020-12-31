const {getTokens, camelCase} = require('../utils')

const getTypography = (layerName, stylesArtboard) => {
  const palette = {typography: {}}
  const decorator = element => {
    const {name} = element
    const {
      fontFamily,
      fontSize,
      lineHeightPx,
      fontWeight
    } = element.children[0].style

    const tokens = {
      [camelCase(name)]: {
        fontFamily: `'${fontFamily}'`,
        fontSize: `${fontSize}px`,
        lineHeight: `${Math.floor(lineHeightPx)}px`,
        fontWeight: fontWeight
      }
    }
    Object.assign(palette.typography, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}

module.exports = getTypography
