import { useContext } from 'react'

import { ThemeContext } from '@/components/wrappers/Layout'

const useTheme = () => {
  return useContext(ThemeContext)
}

export { useTheme }
