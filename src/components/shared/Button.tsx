import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ButtonScheme, ColorScheme } from '@/theme/types'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof ColorScheme['button']
  icon?: JSX.Element
  palette?: ButtonScheme
}

export type { ButtonProps }

const useStyles = createUseStyles<'Button', ButtonProps, ColorScheme>({
  Button: ({ theme, variant = 'primary', icon }) => ({
    color: theme.button[variant].color,
    transition: 'background .15s ',
    padding: '0.5em 1em',
    cursor: 'pointer',
    background: theme.button[variant].bg,
    border: `0.13em solid ${theme.button[variant].border}`,
    wordBreak: 'break-all',
    '&:hover': {
      color: theme.button[variant].hover.color,
      background: theme.button[variant].hover.bg,
      ...('border' in theme.button[variant].hover && {
        borderColor: theme.button[variant].hover.border
      }),
      ...(icon && {
        '& svg': {
          fill: theme.button[variant].hover.color
        }
      })
    },
    '&:focus-visible': {
      outline: `2px solid #32CD32`,
      color: theme.button[variant].hover.color,
      background: theme.button[variant].hover.bg,
      ...('border' in theme.button[variant].hover && {
        borderColor: theme.button[variant].hover.border
      }),
      ...(icon && {
        '& svg': {
          fill: theme.button[variant].hover.color
        }
      })
    },
    ...(icon && {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& span': {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      },
      '& svg': {
        maxHeight: '1.5em',
        maxWidth: '1.5em',
        fill: theme.button[variant].color
      }
    })
  })
})

export default function Button({
  variant,
  className,
  children,
  icon,
  palette,
  ...props
}: ButtonProps) {
  const theme = useTheme()
  const classes = useStyles({
    theme: palette ? { ...theme, button: { ...theme.button, primary: palette } } : theme,
    variant,
    icon,
    ...props
  })

  return (
    <button className={clsx(classes.Button, className)} type='button' {...props}>
      {icon ? (
        <span>
          {icon}
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
