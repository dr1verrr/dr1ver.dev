import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'

type Variants =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'info.secondary'
  | 'action'
  | 'action.secondary'
  | 'lightContrast'

type HighlightedProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & {
  variant?: Variants
}

type StyledHighlightedProps = {
  variant: Variants
}

const DEFAULT_VARIANT = 'primary'

const useStyles = createUseStyles<'Highlighted', StyledHighlightedProps, ColorScheme>({
  Highlighted: ({ theme, variant }) => ({
    padding: [10, 20],
    background: theme.highlighted[variant].bg,
    color: theme.highlighted[variant].color,
    display: 'inline-block',
    border: `0.15em solid ${theme.highlighted[variant].border}`,
    wordBreak: 'break-all'
  })
})

export default function Highlighted({
  children,
  className,
  variant = DEFAULT_VARIANT,
  ...props
}: HighlightedProps) {
  const theme = useTheme()
  const classes = useStyles({ theme, variant })

  return (
    <span className={clsx(classes.Highlighted, className)} {...props}>
      {children}
    </span>
  )
}
