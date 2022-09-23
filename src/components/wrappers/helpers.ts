import { darkScheme, lightScheme } from '@/theme/scheme'

const getTheme = (mode: 'dark' | 'light') => {
  switch (mode) {
    case 'dark':
      return darkScheme

    default:
      return lightScheme
  }
}

const getMode = (isPreferDarkMode: boolean) => (isPreferDarkMode ? 'dark' : 'light')

export { getMode, getTheme }
