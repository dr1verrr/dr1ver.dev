import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

interface ContainerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  maxWidth?: 'md' | 'lg' | 'sm' | number
}

const sizes = {
  md: 900,
  sm: 600,
  lg: 1200
}

const useStyles = createUseStyles<'Container', ContainerProps, ColorScheme>({
  Container: ({ theme, maxWidth }) => ({
    margin: '0 auto',
    padding: [0, 'clamp(15px, 1.5vw, 1.5vw)'],
    ...(maxWidth && {
      maxWidth: `clamp(${
        typeof maxWidth === 'string' ? sizes[maxWidth] : maxWidth
      }px, 50vw, 50vw)`
    })
  })
})

export default function Container({ maxWidth, className, ...props }: ContainerProps) {
  const theme = useTheme()
  const classes = useStyles({ theme, maxWidth })

  return <div className={clsx(classes.Container, className)} {...props} />
}
