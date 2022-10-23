import { createUseStyles } from 'react-jss'

import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'

type MenuIconProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  size?: number | string
  opened?: boolean
}

const useStyles = createUseStyles<
  | 'MenuIcon'
  | 'CheckBox'
  | 'Lines'
  | 'FirstLine'
  | 'SecondLine'
  | '@media (min-width: 1024px)',
  MenuIconProps,
  ColorScheme
>({
  MenuIcon: ({ theme, size = 50 }) => ({
    position: 'relative',
    width: size,
    height: size,
    cursor: 'pointer',
    '&.active, $CheckBox:checked + div': {
      '& $FirstLine': {
        transform: 'rotate(45deg)',
        top: '50%'
      },
      '& $SecondLine': {
        transform: 'rotate(-45deg)',
        bottom: '25%'
      }
    },

    [`&.active:hover $FirstLine,
      &.active:hover $SecondLine,
      &:hover $CheckBox:checked + div $FirstLine,
      &:hover $CheckBox:checked + div $SecondLine,
      &.active:hover $FirstLine`]: {
      width: '100%'
    }
  }),
  '@media (min-width: 1024px)': {
    '$MenuIcon $FirstLine': {
      width: '30%'
    },

    '$MenuIcon $SecondLine': {
      width: '25%'
    }
  },
  CheckBox: ({ theme }) => ({
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 2,
    WebkitTouchCallout: 'none',
    opacity: '0'
  }),
  Lines: ({ theme }) => ({
    margin: 'auto',
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0',
    width: '50%',
    height: '25%',
    '& span': {
      position: 'absolute',
      display: 'block',
      width: '100%',
      height: '20%',
      backgroundColor: theme.color,
      borderRadius: '2%',
      transition: 'all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965)'
    }
  }),
  FirstLine: ({ theme }) => ({
    top: 0
  }),
  SecondLine: ({ theme }) => ({
    bottom: 0
  })
})

export type { MenuIconProps }

export default function Menu({ size, opened }: MenuIconProps) {
  const theme = useTheme()
  const classes = useStyles({ theme, size, opened })

  return (
    <div className={classes.MenuIcon}>
      <input
        readOnly
        className={classes.CheckBox}
        type='checkbox'
        {...(typeof opened === 'boolean' && { checked: opened })}
      />
      <div className={classes.Lines}>
        <span className={classes.FirstLine}></span>
        <span className={classes.SecondLine}></span>
      </div>
    </div>
  )
}
