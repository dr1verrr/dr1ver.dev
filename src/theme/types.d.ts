type Palette = {
  bg: string
  color: string
  border: string
  hover: {
    bg: string
    color: string
    border?: string
  }
}

type PaletteScheme = {
  primary: Palette
  secondary: Palette
  action: Palette
  'action.secondary': Palette
  info: Palette
  'info.secondary': Palette
  lightContrast: Palette
}

type ButtonScheme = {
  bg: string
  color: string
  border: string
  hover: {
    bg: string
    color: string
    border?: string
  }
}

type ColorScheme = {
  palette: PaletteScheme
  palettes: {
    light: PaletteScheme
    dark: PaletteScheme
  }
  mode: 'dark' | 'light'
  bg: string
  color: string
  hover: string
  accent: string
  divider: string
  button: {
    action: ButtonScheme
    primary: ButtonScheme
    info: ButtonScheme
    secondary: ButtonScheme
    'action.secondary': ButtonScheme
    'info.secondary': ButtonScheme
  }
  highlighted: PaletteScheme
}

export type { ButtonScheme, ColorScheme, Palette, PaletteScheme }
