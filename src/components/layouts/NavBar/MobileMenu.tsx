import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { NavLink } from 'react-router-dom'

import Box from '@/components/shared/Box'
import MenuIcon, { MenuIconProps } from '@/components/ui/navigation/Menu'
import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'
import { rgba } from '@/utils/styles'

import { navLinks } from './constants'

const useStyles = createUseStyles<
  'Menu' | 'Wrapper' | 'Close' | 'List' | 'ListElement' | 'ListElementLink',
  unknown,
  ColorScheme
>({
  Menu: ({ theme }) => ({
    fontSize: `clamp(25px, 1.5vw + 1vh, 1.5vw + 1vh)`,
    textAlign: 'center',
    color: theme.palette.lightContrast.color,
    fontWeight: 300,
    '&[data-type=opened]': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      zIndex: 3000,
      '& $Wrapper': {
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 300,
        background: rgba(theme.bg, 0.9)
      },
      '& $Close': {
        display: 'flex',
        alignItems: 'center',
        borderBottom: `clamp(2px, 0.15vw, 0.15vw) solid ${theme.accent}`
      }
    }
  }),
  Wrapper: ({ theme }) => ({
    zIndex: 3000,
    position: 'relative',
    maxHeight: '100vh'
  }),
  Close: ({ theme }) => ({
    transition: 'background .1s ease',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      background: theme.hover,
      color: theme.color
    }
  }),
  List: ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }),
  ListElement: ({ theme }) => ({
    transition: 'background .1s ease',
    padding: [
      'clamp(20px, 1vw + 1vh, 1vw + 1vh)',
      'clamp(10px, 0.5vh + 0.5vw, 0.5vh + 0.5vw)'
    ],
    '&:hover': {
      background: theme.hover,
      color: theme.color
    },
    borderBottom: `1px solid ${theme.divider}`,
    width: '100%',
    '&[data-type=focused]': {
      background: theme.color,
      color: theme.bg
    }
  }),
  ListElementLink: ({ theme }) => ({})
})

type MobileMenuProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  OpenButtonProps?: MenuIconProps
  onClose?: (...args: any[]) => void
  open?: boolean
}

export default function MobileMenu({
  OpenButtonProps,
  onClose,
  open = false,
  ...props
}: MobileMenuProps) {
  const [isOpen, setOpen] = useState(open)
  const theme = useTheme()
  const classes = useStyles({ theme })

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        className={classes.Close}
        sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}
        onClick={handleOpen}
      >
        <MenuIcon
          opened={isOpen}
          size='clamp(45px, 2.5vw + 2.5vh, 2.5vw + 2.5vh)'
          {...OpenButtonProps}
        />
      </Box>
      {isOpen && (
        <nav className={classes.Menu} data-type={isOpen && 'opened'} {...props}>
          <div className={classes.Wrapper}>
            <Box className={classes.Close} onClick={handleClose}>
              <MenuIcon
                opened={isOpen}
                size='clamp(45px, 2.5vw + 2.5vh, 2.5vw + 2.5vh)'
              />
            </Box>
            {isOpen && (
              <ul className={classes.List}>
                {navLinks.map((item, idx) => (
                  <NavLink
                    key={idx}
                    className={classes.ListElementLink}
                    to={item.route}
                    onClick={handleClose}
                  >
                    <li
                      className={classes.ListElement}
                      data-type={location.pathname === item.route && 'focused'}
                    >
                      {item.label}
                    </li>
                  </NavLink>
                ))}
              </ul>
            )}
          </div>
        </nav>
      )}
    </Box>
  )
}
