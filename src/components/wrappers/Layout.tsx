import React, {
  createContext,
  memo,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { createTheming, createUseStyles, JssProvider } from 'react-jss'

import { Box, Button, Stack } from '@/components/shared'
import useMediaQuery from '@/hooks/useMediaQuery'
import { jss } from '@/services/jss'
import { LocalStorageKey, LocalStorageKey as LSThemeKey } from '@/theme/constants'
import { useTheme } from '@/theme/hooks'
import { lightScheme } from '@/theme/scheme'
import { ColorScheme } from '@/theme/types'
import { loadState, saveState } from '@/utils/localStorage'
import { rgba } from '@/utils/styles'

import Animation from '../animation/first-load/Animation'
import NavBar from '../layouts/NavBar'
import Spinner from '../ui/lazyload/Spinner'
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
  | 'Layout'
  | 'LayoutInner'
  | 'LayoutWrapper'
  | 'SkipNavigation'
  | '@media (max-width: 760px)',
  unknown,
  ColorScheme
>({
  Layout: ({ theme }) => ({
    overflow: 'auto',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    position: 'relative',
    '& ::selection': {
      background: theme.color,
      color: theme.bg
    }
  }),
  LayoutWrapper: ({ theme }) => ({
    fontSize: 'clamp(16px, 0.5vh + 0.5vw, 0.5vh + 0.5vw)',
    color: theme.color,
    background: theme.bg,
    width: '100vw',
    display: 'flex',
    position: 'relative',
    height: '100vh',
    fill: theme.color,
    '&::-webkit-scrollbar-thumb': {
      background: '#333'
    }
  }),
  '@media (max-width: 760px)': {
    LayoutWrapper: {
      flexDirection: 'column'
    }
  },
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
  actions: {
    switchTheme: () => void
    animationPlayed: {
      set: React.Dispatch<React.SetStateAction<boolean>>
    }
  }
  LayoutInner: {
    ref: React.RefObject<HTMLDivElement>
  }
  LayoutWrapper: {
    ref: React.RefObject<HTMLDivElement>
  }
  Layout: {
    ref: React.RefObject<HTMLDivElement>
  }
}

const LayoutContext = createContext<TLayoutContext>({} as TLayoutContext)
const useLayoutContext = () => useContext(LayoutContext)

const LayoutInner = ({
  children,
  refs
}: {
  children?: ReactNode
  refs: {
    LayoutInner: {
      ref: React.RefObject<HTMLDivElement>
    }
    LayoutWrapper: {
      ref: React.RefObject<HTMLDivElement>
    }
    Layout: {
      ref: React.RefObject<HTMLDivElement>
    }
  }
}) => {
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
    <div ref={refs.LayoutWrapper.ref} className={classes.LayoutWrapper}>
      <Suspense
        fallback={
          <Box
            sx={{
              position: 'absolute',
              left: 'clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)',
              bottom: 'clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)'
            }}
          >
            <Spinner />
          </Box>
        }
      >
        {MemoizedNavBar}
      </Suspense>
      <div ref={refs.Layout.ref} className={classes.Layout}>
        <Button
          className={classes.SkipNavigation}
          tabIndex={1000}
          type='button'
          variant='action'
          onClick={handlers.skipNavigation.onClick}
        >
          Skip navigation
        </Button>
        <Suspense
          fallback={
            <Box
              sx={{
                position: 'absolute',
                left: 'clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)',
                bottom: 'clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)'
              }}
            >
              <Spinner />
            </Box>
          }
        >
          <main ref={refs.LayoutInner.ref} className={classes.LayoutInner}>
            {children}
          </main>
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
  const LayoutInnerEl = useRef<HTMLDivElement>(null)
  const LayoutEl = useRef<HTMLDivElement>(null)
  const LayoutWrapperEl = useRef<HTMLDivElement>(null)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<ColorScheme>(getTheme(loadState(LSThemeKey)))
  const [animationPlayed, setAnimationPlayed] = useState(false)

  const switchTheme = useCallback(() => {
    setTheme(getTheme(theme.mode === 'dark' ? 'light' : 'dark'))
  }, [theme])

  const actions = {
    switchTheme,
    animationPlayed: {
      set: setAnimationPlayed
    }
  }

  const refs = {
    Layout: {
      ref: LayoutEl
    },
    LayoutInner: {
      ref: LayoutInnerEl
    },
    LayoutWrapper: {
      ref: LayoutWrapperEl
    }
  }

  useEffect(() => {
    const mode = getMode(prefersDarkMode)
    const theme = getTheme(mode)
    setTheme(theme)
    saveState(LocalStorageKey, mode)
  }, [prefersDarkMode])

  return (
    <JssProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <LayoutContext.Provider
          value={{
            actions,
            ...refs
          }}
        >
          <MemoizedLayoutInner refs={refs}>
            <Animation />

            <Stack style={{ display: animationPlayed ? 'flex' : 'none', width: '100%' }}>
              {children}
            </Stack>
          </MemoizedLayoutInner>
        </LayoutContext.Provider>
      </ThemeProvider>
    </JssProvider>
  )
}
