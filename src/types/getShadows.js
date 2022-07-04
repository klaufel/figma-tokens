import { getTokens, camelCase, genShadow } from '../utils.js'

export default function getShadows (layerName, stylesArtboard) {
  const palette = { shadow: {} }
  const decorator = element => {
    const { name } = element
    const { color, offset, radius } = element.effects[0]
    const tokens = {
      [camelCase(name)]: genShadow(color, offset, radius)
    }
    Object.assign(palette.shadow, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}
