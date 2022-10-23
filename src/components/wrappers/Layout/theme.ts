import React from 'react'
import { createTheming } from 'react-jss'

import { lightScheme } from '@/theme/scheme'
import { ColorScheme } from '@/theme/types'

const ThemeContext = React.createContext<ColorScheme>(lightScheme)
const theming = createTheming(ThemeContext)

const { ThemeProvider, useTheme, withTheme, context } = theming

export { context, ThemeContext, ThemeProvider, useTheme, withTheme }
