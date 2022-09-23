const palettes = {
  light: {
    action: {
      bg: '#5D3FD3',
      color: '#fff',
      border: '#333',
      hover: {
        bg: '#fff',
        color: '#5D3FD3',
        border: '#5D3FD3'
      }
    },
    'action.secondary': {
      bg: '#fff',
      color: '#5D3FD3',
      border: '#5D3FD3',
      hover: {
        bg: '#5D3FD3',
        color: '#fff',
        border: '#000'
      }
    },
    primary: {
      border: '#333',
      bg: '#111',
      color: '#fff',
      hover: {
        bg: '#fff',
        color: '#000'
      }
    },
    info: {
      border: '#333',
      bg: '#0058b5',
      color: '#fff',
      hover: {
        bg: '#fff',
        color: '#0058b5',
        border: '#0058b5'
      }
    },
    secondary: {
      border: '#000',
      bg: '#fff',
      color: '#333',
      hover: {
        bg: '#000',
        color: '#fff',
        border: '#333'
      }
    },
    'info.secondary': {
      bg: '#fff',
      color: '#0058b5',
      border: '#0058b5',
      hover: {
        border: '#fff',
        bg: '#0058b5',
        color: '#fff'
      }
    }
  },
  dark: {
    action: {
      bg: '#5D3FD3',
      color: '#fff',
      border: '#fff',
      hover: {
        bg: '#000',
        color: '#5D3FD3',
        border: '#5D3FD3'
      }
    },
    'action.secondary': {
      bg: '#111',
      color: '#5D3FD3',
      border: '#5D3FD3',
      hover: {
        bg: '#5D3FD3',
        color: '#fff',
        border: '#fff'
      }
    },
    primary: {
      border: '#000',
      bg: '#fff',
      color: '#000',
      hover: {
        bg: '#000',
        color: '#fff',
        border: '#fff'
      }
    },
    info: {
      border: '#fff',
      bg: '#0058b5',
      color: '#fff',
      hover: {
        bg: '#111',
        color: '#0058b5',
        border: '#0058b5'
      }
    },
    secondary: {
      border: '#fff',
      bg: '#000',
      color: '#fff',
      hover: {
        bg: '#fff',
        color: '#000'
      }
    },
    'info.secondary': {
      bg: '#111',
      color: '#0058b5',
      border: '#0058b5',
      hover: {
        border: '#fff',
        bg: '#0058b5',
        color: '#fff'
      }
    }
  }
}

const highlightedPalette = { light: palettes.light, dark: palettes.dark }

const buttonPalette = {
  light: {
    primary: palettes.light.primary,
    secondary: palettes.light.secondary,
    action: palettes.light.action,
    'action.secondary': palettes.light['action.secondary'],
    info: palettes.light.info,
    'info.secondary': palettes.light['info.secondary']
  },
  dark: {
    primary: palettes.dark.primary,
    secondary: palettes.dark.secondary,
    action: palettes.dark.action,
    'action.secondary': palettes.dark['action.secondary'],
    info: palettes.dark.info,
    'info.secondary': palettes.dark['info.secondary']
  }
}

export { buttonPalette, highlightedPalette }

export default palettes
