import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: keyof ColorScheme['button']
}

export type { ButtonProps }

const useStyles = createUseStyles<'btn', ButtonProps, ColorScheme>({
  btn: ({ theme, variant = 'primary' }) => ({
    color: theme.button[variant].color,
    transition: 'background .15s ',
    padding: '0.5em 1em',
    cursor: 'pointer',
    background: theme.button[variant].bg,
    border: `2px solid ${theme.button[variant].border}`,
    '&:hover': {
      color: theme.button[variant].hover.color,
      background: theme.button[variant].hover.bg,
      ...('border' in theme.button[variant].hover && {
        borderColor: theme.button[variant].hover.border
      })
    },
    '&:focus-visible': {
      borderColor: '#32CD32',
      outline: 'none'
    }
  })
})

export default function Button({ variant, className, ...props }: ButtonProps) {
  const theme = useTheme()
  const classes = useStyles({ theme, variant, ...props })

  return <button className={clsx(classes.btn, className)} type='button' {...props} />
}
