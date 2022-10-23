import { createContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createUseStyles } from 'react-jss'

import { useLayoutContext } from '@/components/wrappers/Layout'
import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'

import Logo from './Logo'

type StyledAnimationProps = {
  animationType: 'first' | 'second' | string
}

const useStyles = createUseStyles<
  | 'Wrapper'
  | 'Inner'
  | '@media (max-width: 670px)'
  | 'FirstLayout'
  | 'SecondLayout'
  | '@keyframes FirstAnimation'
  | 'Logo',
  StyledAnimationProps,
  ColorScheme
>({
  Wrapper: ({ theme, animationType }) => ({
    transitionProperty: 'translate, opacity, scale',
    transitionDuration: '.5s',
    position: 'fixed',
    background: theme.bg,
    outline: `clamp(1px, 0.05vw, 0.05vw) solid ${theme.divider}`,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 2000,
    fontSize: 'clamp(16px, 1vw + 1vw, 1vw + 1vw)',
    userSelect: 'none',
    color: theme.color,
    ...(animationType === 'second' && {
      translate: '100% 0',
      opacity: 0
    })
  }),
  Inner: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontSize: 'clamp(16px, 7vw + 7vh, 7vw + 7vh)',
    position: 'relative'
  }),
  Logo: ({ theme }) => ({}),
  FirstLayout: ({ theme }) => ({
    position: 'absolute',
    zIndex: 5000,
    background: '#fff',
    color: theme.color,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  '@keyframes FirstAnimation': {
    '0%': {
      translate: '0 100%'
    },
    '50%': {
      translate: '0 50%'
    },
    '100%': {
      translate: 0
    }
  },
  SecondLayout: ({ theme, animationType }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    background: '#111',
    justifyContent: 'center',
    ...(animationType === 'first' && {
      animation: '$FirstAnimation .75s ease'
    })
  }),
  '@media (max-width: 670px)': {
    Inner: {
      fontSize: 'clamp(16px, 4vw + 4vh, 4vw + 4vh) !important'
    }
  }
})

type TAnimationContext = {
  status: {
    animationEnd: boolean
  }
  actions: {
    animation: {
      end: () => void
      type: {
        next: () => void
      }
    }
  }
}
const AnimationContext = createContext<TAnimationContext>({
  status: {
    animationEnd: false
  }
} as TAnimationContext)

const ANIMATION_TYPE = {
  first: 'first',
  second: 'second'
}

export default function Animation() {
  const [animationEnd, setAnimationEnd] = useState(false)
  const [animationType, setAnimationType] = useState(ANIMATION_TYPE.first)
  const { actions: layoutActions } = useLayoutContext()

  const theme = useTheme()
  const classes = useStyles({ theme, animationType })

  const actions = {
    animation: {
      end: () => {
        setAnimationEnd(true)
      },
      type: {
        next: () => {
          if (animationType === ANIMATION_TYPE.first) {
            setAnimationType(ANIMATION_TYPE.second)
          }
        }
      }
    }
  }

  useEffect(() => {
    if (animationType === ANIMATION_TYPE.second) {
      layoutActions.animationPlayed.set(true)
    }
  }, [animationType])

  if (animationEnd) {
    return null
  }

  return createPortal(
    <AnimationContext.Provider
      value={{
        actions,
        status: { animationEnd }
      }}
    >
      <div
        className={classes.Wrapper}
        onTransitionEnd={() => {
          setAnimationEnd(true)
        }}
      >
        <div className={classes.Inner}>
          <div className={classes.FirstLayout}>
            <Logo
              LogoProps={{
                color: '#fff',
                zIndex: 3000,
                mixBlendMode: 'difference'
              }}
              SecondLogoProps={{ color: theme.palette.lightContrast.color }}
            />
            <div
              className={classes.SecondLayout}
              onAnimationEnd={() => {
                actions.animation.type.next()
              }}
            ></div>
          </div>
        </div>
      </div>
    </AnimationContext.Provider>,
    document.getElementById('root')!
  )
}
