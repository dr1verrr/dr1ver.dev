import clsx from 'clsx'
import { CSSProperties, forwardRef, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

type StackProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  sx?: CSSProperties
  children?: ReactNode
  direction?: 'row' | 'column'
  spacing?: number | string
}

type RuleNames = 'Stack'

type StackStyledProps = Omit<StackProps, 'direction'> &
  Required<Pick<StackProps, 'direction'>>

const useStyles = createUseStyles<RuleNames, StackStyledProps>({
  Stack: ({ direction, spacing }) => ({
    display: 'flex',
    flexDirection: direction,
    gap: spacing
  })
})

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, sx, className, direction = 'row', spacing, ...props }, ref) => {
    const classes = useStyles({ sx, direction, spacing })
    return (
      <div ref={ref} className={clsx(classes.Stack, className)} style={sx} {...props}>
        {children}
      </div>
    )
  }
)

export default Stack
