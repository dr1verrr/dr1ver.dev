import palettes, { buttonPalette, highlightedPalette } from './palettes'
import { ColorScheme } from './types'

const lightScheme: ColorScheme = {
  palette: palettes.light,
  palettes,
  mode: 'light',
  bg: '#fff',
  color: '#000',
  hover: '#dedede',
  accent: '#5D3FD3',
  divider: '#ccc',
  button: buttonPalette.light,
  highlighted: highlightedPalette.light
}

const darkScheme: ColorScheme = {
  palette: palettes.dark,
  palettes,
  mode: 'dark',
  bg: '#111',
  color: '#fff',
  hover: '#222',
  accent: '#5D3FD3',
  divider: '#333',
  button: buttonPalette.dark,
  highlighted: highlightedPalette.dark
}

export { darkScheme, lightScheme }
