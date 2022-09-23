import React, {
  createContext,
  memo,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { createTheming, createUseStyles, JssProvider } from 'react-jss'

import useMediaQuery from '@/hooks/useMediaQuery'
import { jss } from '@/services/jss'
import { LocalStorageKey, LocalStorageKey as LSThemeKey } from '@/theme/constants'
import { useTheme } from '@/theme/hooks'
import { lightScheme } from '@/theme/scheme'
import { ColorScheme } from '@/theme/types'
import { loadState, saveState } from '@/utils/localStorage'
import { rgba } from '@/utils/styles'

import NavBar from '../layouts/NavBar/NavBar'
import Button from '../shared/Button'
import { getMode, getTheme } from './helpers'

type LayoutProps = {
  children?: React.ReactNode
}

const ThemeContext = React.createContext<ColorScheme>(lightScheme)
const theming = createTheming(ThemeContext)
const { ThemeProvider } = theming

export { jss, ThemeContext }
export { useLayoutContext }

const useStyles = createUseStyles<
  'Layout' | 'LayoutInner' | 'LayoutWrapper' | 'SkipNavigation',
  unknown,
  ColorScheme
>({
  Layout: ({ theme }) => ({
    overflow: 'auto',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    '& ::selection': {
      background: theme.color,
      color: theme.bg
    },
    '& :focus-visible:not(button)': {
      outline: `2px solid #00FFFF`
    }
  }),
  LayoutWrapper: ({ theme }) => ({
    color: theme.color,
    background: theme.bg,
    overflow: 'hidden',
    width: '100vw',
    display: 'flex',
    height: '100vh',
    '@media (max-width: 760px)': {
      flexDirection: 'column',
      alignItems: 'self-start'
    }
  }),
  LayoutInner: ({ theme }) => ({
    flex: 1,
    display: 'flex',
    background: rgba(theme.divider, 0.1)
  }),
  SkipNavigation: ({ theme }) => ({
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    '&:focus-visible': {
      opacity: 1,
      pointerEvents: 'all'
    }
  })
})

type TLayoutContext = {
  switchTheme: () => void
}

const LayoutContext = createContext<TLayoutContext>({} as TLayoutContext)
const useLayoutContext = () => useContext(LayoutContext)

const LayoutInner = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme()
  const classes = useStyles({ theme })
  const MemoizedNavBar = useMemo(() => <NavBar />, [])

  const handlers = {
    skipNavigation: {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        const main = document.querySelector('main')
        if (main) {
          main.tabIndex = -1
          main.focus()
          setTimeout(() => main.removeAttribute('tabindex'), 1000)
        }
      }
    }
  }

  return (
    <div className={classes.LayoutWrapper}>
      {MemoizedNavBar}
      <div className={classes.Layout}>
        <a
          className={classes.SkipNavigation}
          href='#'
          tabIndex={1000}
          onClick={handlers.skipNavigation.onClick}
        >
          <Button type='button' variant='action'>
            Skip navigation
          </Button>
        </a>
        <Suspense fallback={<div>Loading...</div>}>
          <main className={classes.LayoutInner}>{children}</main>
        </Suspense>
      </div>
    </div>
  )
}

const MemoizedLayoutInner = memo(LayoutInner)

type ThemeContext = {
  switchTheme: () => void
}

export default function Layout({ children }: LayoutProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<ColorScheme>(getTheme(loadState(LSThemeKey)))

  const switchTheme = useCallback(() => {
    setTheme(getTheme(theme.mode === 'dark' ? 'light' : 'dark'))
  }, [theme])

  useEffect(() => {
    const mode = getMode(prefersDarkMode)
    const theme = getTheme(mode)
    setTheme(theme)
    saveState(LocalStorageKey, mode)
  }, [prefersDarkMode])

  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <LayoutContext.Provider value={{ switchTheme }}>
          <MemoizedLayoutInner>{children}</MemoizedLayoutInner>
        </LayoutContext.Provider>
      </ThemeProvider>
    </JssProvider>
  )
}
