import clsx from 'clsx'
import { forwardRef } from 'react'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

interface TextFieldProps
  extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  sx?: React.CSSProperties
  multiline?: boolean
}

type RuleNames = 'TextField'

const useStyles = createUseStyles<RuleNames, TextFieldProps, ColorScheme>({
  TextField: ({ theme }) => ({
    display: 'inline-block',
    transitionDuration: '.15s',
    transitionProperty: 'background, border-color, color',
    color: theme.color,
    background: theme.bg,
    padding: 10,
    border: `2px solid ${theme.divider}`,
    outline: 'none',
    '&:autofill': {},
    '&:hover': {
      borderColor: theme.color,
      background: theme.hover
    },
    '&:focus': {
      borderColor: 'none',
      background: theme.bg
    },
    '&:focus-visible': {
      borderColor: theme.accent
    },
    '&:invalid:not(:required)': {
      borderColor: 'red'
    }
  })
})

const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  ({ sx, multiline = false, className, ...props }, ref) => {
    const theme = useTheme()
    const classes = useStyles({ theme, ...props })

    if (multiline) {
      return (
        <textarea
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          className={clsx(classes.TextField, className)}
          style={sx}
          {...props}
        />
      )
    }

    return (
      <input
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        className={clsx(classes.TextField, className)}
        style={sx}
        {...props}
      />
    )
  }
)

export default TextField
