import { getTokens, camelCase } from '../utils.js'

export default function getSpacing (layerName, stylesArtboard) {
  const palette = { spacing: {} }
  const decorator = element => {
    const {
      name,
      absoluteBoundingBox: { width }
    } = element
    const tokens = {
      [camelCase(name)]: `${width}px`
    }
    Object.assign(palette.spacing, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}
