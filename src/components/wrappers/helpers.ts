import { darkScheme, lightScheme } from '@/theme/scheme'

const getTheme = (mode: 'dark' | 'light') => {
  if (mode === 'dark') {
    return darkScheme
  }

  return lightScheme
}

const getMode = (isPreferDarkMode: boolean) => (isPreferDarkMode ? 'dark' : 'light')

export { getMode, getTheme }
