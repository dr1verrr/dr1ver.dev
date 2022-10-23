import { lazy, useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { NavLink, useLocation } from 'react-router-dom'

import Box from '@/components/shared/Box'
import UIButton from '@/components/shared/Button'
import Stack from '@/components/shared/Stack'
import { useTheme } from '@/components/wrappers/Layout/theme'
import adaptive from '@/hoc/adaptive'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import { navLinks, socialLinks } from './constants'

const MobileMenu = lazy(() => import('./MobileMenu'))

const Button = adaptive(UIButton)

const useStyles = createUseStyles<
  | 'NavBar'
  | 'Header'
  | 'NavList'
  | 'NavListElement'
  | 'NavListElementLink'
  | 'HeaderLogo'
  | 'HeaderIcons'
  | '@media (max-width: 760px)',
  unknown,
  ColorScheme
>({
  HeaderLogo: ({ theme }) => ({
    color: theme.palette.lightContrast.color,
    background: theme.bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'background .1s ease',
    width: '100%',
    padding: 'clamp(10px, 0.5vh + 0.5vw, 0.5vh + 0.5vw)',
    border: `0.03em solid ${theme.divider}`,
    borderRight: 0,
    borderTop: 0,
    borderLeft: 0,
    fontSize: `clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)`,
    '&:hover': {
      background: theme.hover,
      color: theme.color
    },
    '&[data-type=focused]': {
      background: theme.color + '!important',
      color: theme.bg + '!important',
      '& .secondary': {
        color: rgba(theme.bg, 0.7)
      }
    },
    '& .primary': {
      fontWeight: 400
    },
    '& .secondary': {
      color: rgba(theme.palette.lightContrast.color, 0.7)
    }
  }),
  NavBar: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flex: 1
  }),
  NavList: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    overflow: 'auto',
    borderTop: `0.03em solid ${theme.divider}`
  }),
  NavListElement: ({ theme }) => ({
    color: theme.palette.lightContrast.color,
    background: theme.bg,
    position: 'relative',
    transition: '.15s background',
    padding: [
      `clamp(10px, 0.7vw + 0.7vh, 0.7vw + 0.7vh)`,
      `clamp(15px, 1.5vw + 1.5vh, 1.5vw + 1.5vh)`
    ],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `0.03em solid ${theme.divider}`,
    '&:hover': {
      background: theme.hover,
      color: theme.color
    },
    '&[data-type=focused]': {
      background: theme.color + '!important',
      color: theme.bg + '!important'
    }
  }),
  NavListElementLink: ({ theme }) => ({
    '&:focus-visible $NavListElement': {
      background: theme.hover,
      color: theme.color
    }
  }),
  Header: ({ theme }) => ({
    zIndex: 500,
    position: 'relative',
    background: theme.bg,
    fontSize: `clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)`,
    overflow: 'auto',
    borderRight: `0.03em solid ${rgba(theme.divider, 0.5)}`,
    display: 'flex',
    flexDirection: 'column'
  }),
  HeaderIcons: ({ theme }) => ({
    marginTop: 'auto',
    padding: 'clamp(12px, 1vw, 1vw)',
    paddingBottom: 'clamp(50px, 1vh + 1vh, 1vh + 1vw)',
    alignItems: 'center',
    borderTop: `0.03em solid ${theme.divider}`,
    justifyContent: 'center'
  }),
  '@media (max-width: 760px)': {
    Header: ({ theme }) => ({
      width: '100%',
      border: 0,
      borderBottom: `0.03em solid ${theme.divider}`,
      flexDirection: 'row'
    }),
    NavList: ({ theme }) => ({
      flexDirection: 'row',
      maxWidth: 'fit-content',
      height: '100%',
      justifyContent: 'stretch',
      border: 'none',
      borderLeft: `0.03em solid ${theme.divider}`,
      borderRight: `0.03em solid ${theme.divider}`
    }),
    NavListElement: ({ theme }) => ({
      height: '100%',
      borderBottom: 'none',
      borderRight: `0.03em solid ${theme.divider}`,
      '&:last-child': {
        border: 'none'
      }
    }),
    HeaderLogo: ({ theme }) => ({
      maxWidth: 'fit-content',
      border: 0 + '!important',
      height: '100%',
      borderRight: `0.03em solid ${theme.divider} !important`
    }),
    NavBar: {
      justifyContent: 'center'
    },
    HeaderIcons: {
      marginTop: 0,
      marginLeft: 'auto',
      padding: 'clamp(12px, 1vw, 1vw) !important',
      border: 0 + '!important',
      borderLeft: `0.03em `
    }
  }
})

export default function NavBar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [dimensionsChecked, setDimensionsChecked] = useState(false)
  const theme = useTheme()
  const classes = useStyles({ theme })
  const location = useLocation()

  const navListRef = useRef<HTMLUListElement>(null)
  const navBarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const navList = navListRef.current
    const navBar = navBarRef.current

    if (navList && navBar) {
      let navListSize: number
      let navBarSize: number

      const handler = () => {
        if (window.innerWidth < 760) {
          navListSize = navList.clientWidth
          navBarSize = navBar.clientWidth
        } else {
          navListSize = navList.clientHeight
          navBarSize = navBar.clientHeight
        }

        if (navBarSize - 120 - navListSize <= 0) {
          setMobileMenu(prev => !prev)
        }
      }

      const handleOnFirstMount = () => {
        handler()
        setDimensionsChecked(true)
      }

      handleOnFirstMount()

      window.removeEventListener('resize', handler)
      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    }
  }, [mobileMenu])

  return (
    <header className={classes.Header}>
      <Box
        className={classes.HeaderLogo}
        data-type={location.pathname === '/' && 'focused'}
      >
        <span className='primary'>dr1ver</span>.<span className='secondary'>dev</span>
        <NavLink
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%'
          }}
          to='/'
        ></NavLink>
      </Box>

      {mobileMenu ? (
        <Box>
          <MobileMenu />
        </Box>
      ) : (
        <nav
          ref={navBarRef}
          className={classes.NavBar}
          {...(dimensionsChecked
            ? { style: { opacity: 1, visibility: 'visible' } }
            : { style: { opacity: 0, visibility: 'hidden' } })}
        >
          <ul ref={navListRef} className={classes.NavList}>
            {navLinks.map((item, idx) => (
              <NavLink key={idx} className={classes.NavListElementLink} to={item.route}>
                <li
                  className={classes.NavListElement}
                  data-type={location.pathname === item.route && 'focused'}
                >
                  {item.label}
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      )}

      <Stack className={classes.HeaderIcons} spacing='clamp(10px, 0.5em, 0.5em)'>
        {socialLinks.map((sl, idx) => (
          <a
            key={idx}
            href={sl.link}
            style={{ borderRadius: '25%' }}
            tabIndex={-1}
            target='_blank'
          >
            <Button
              icon={<sl.icon />}
              style={{ padding: '0.4em', borderRadius: '25%' }}
            ></Button>
          </a>
        ))}
      </Stack>
    </header>
  )
}
