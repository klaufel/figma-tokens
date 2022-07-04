import { getTokens, camelCase } from '../utils.js'

export default function getRadius (layerName, stylesArtboard) {
  const palette = { radius: {} }
  const decorator = element => {
    const { name } = element
    const { cornerRadius } = element.children[0]
    const tokens = {
      [camelCase(name)]: `${cornerRadius}px`
    }
    Object.assign(palette.radius, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}
