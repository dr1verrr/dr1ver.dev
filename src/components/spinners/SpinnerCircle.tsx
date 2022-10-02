import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

type SpinnerCircleProps = {
  lineWidth?: number | string
  size?: number | string
  speed?: number
}

const useStyles = createUseStyles<
  'SpinnerCircle' | '@keyframes rotation',
  SpinnerCircleProps,
  ColorScheme
>({
  SpinnerCircle: ({ theme, lineWidth, size, speed = 1 }) => ({
    width:
      (size &&
        (typeof size === 'number' ? size + 'px' : `clamp(48px, ${size}, ${size})`)) ||
      '48px',
    height:
      (size &&
        (typeof size === 'number' ? size + 'px' : `clamp(48px, ${size}, ${size})`)) ||
      '48px',
    border: `${
      (lineWidth &&
        (typeof lineWidth === 'number'
          ? lineWidth + 'px'
          : `clamp(5px, ${lineWidth}, ${lineWidth})`)) ||
      '5px'
    } solid ${theme.color}`,
    borderBottomColor: theme.accent,
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: `$rotation ${speed / (speed * speed)}s linear infinite`
  }),
  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  }
})

export default function SpinnerCircle({
  lineWidth,
  size,
  speed = 1
}: SpinnerCircleProps) {
  const theme = useTheme()
  const classes = useStyles({ theme, lineWidth, size, speed })

  return <span className={classes.SpinnerCircle}></span>
}
