import { Helmet } from 'react-helmet'
import { createUseStyles } from 'react-jss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import { navLinks } from './constants'

const useStyles = createUseStyles<
  'NavBar' | 'Header' | 'NavList' | 'NavListElement' | 'NavListElementLink',
  unknown,
  ColorScheme
>({
  Header: ({ theme }) => ({
    background: theme.bg,
    fontSize: `clamp(14px, 0.75vw + 0.5vh, 0.75vw + 0.5vh)`,
    overflow: 'auto',
    borderRight: `1px solid ${rgba(theme.divider, 0.5)}`,
    '@media (max-width: 760px)': {
      width: '100%',
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      border: 0,
      borderBottom: `1px solid ${theme.divider}`,
      '& $NavList': {
        flexDirection: 'row',
        maxWidth: '100%',
        justifyContent: 'stretch',
        border: 'none',
        borderLeft: `1px solid ${theme.divider}`,
        borderRight: `1px solid ${theme.divider}`
      },
      '& $NavListElement': {
        borderBottom: 'none',
        borderRight: `1px solid ${theme.divider}`,
        '&:last-child': {
          border: 'none'
        }
      },
      '& $NavBar': {
        justifyContent: 'center'
      }
    }
  }),
  NavBar: ({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  }),
  NavList: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 'fit-content',
    justifyContent: 'center',
    overflow: 'auto',
    borderTop: `1px solid ${theme.divider}`
  }),
  NavListElement: ({ theme }) => ({
    background: theme.bg,
    position: 'relative',
    transition: '.2s background',
    padding: [
      `clamp(10px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)`,
      `clamp(10px, 0.7vw + 0.7vh, 0.7vw + 0.7vh)`
    ],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.divider}`,
    '&[data-type=focused]': {
      background: theme.color,
      color: theme.bg
    }
  }),
  NavListElementLink: ({ theme }) => ({
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: 'default',
    '&:focus-visible': {
      outline: `1px solid ${theme.color}`
    }
  })
})

export default function NavBar() {
  const theme = useTheme()
  const classes = useStyles({ theme })
  const location = useLocation()
  const navigate = useNavigate()

  const actions = {
    navigate: (pathName: string) => {
      if (location.pathname !== pathName) {
        navigate(pathName)
      }
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, pathName: string) => {
    actions.navigate(pathName)
  }

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    link: string
  ) => {
    e.preventDefault()
    if (location.pathname !== link) {
      navigate(link)
    }
  }

  return (
    <>
      <Helmet>
        <title>
          dr1ver.dev - {navLinks.find(n => n.route === location.pathname)?.label}
        </title>
      </Helmet>
      <header className={classes.Header}>
        <nav className={classes.NavBar}>
          <ul className={classes.NavList}>
            {navLinks.map((item, idx) => (
              <li
                key={idx}
                className={classes.NavListElement}
                data-type={location.pathname === item.route && 'focused'}
                onClick={e => handleClick(e, item.route)}
                onMouseEnter={e => handleMouseEnter(e, item.route)}
              >
                {item.label}
                <NavLink className={classes.NavListElementLink} to={item.route}></NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}
