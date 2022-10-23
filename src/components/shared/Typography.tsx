import clsx from 'clsx'
import React, { createElement, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/components/wrappers/Layout/theme'
import { ColorScheme } from '@/theme/types'

const DEFAULT_VARIANT = 'body'

type TypographyBase = {
  className?: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body'
  element?: 'span' | 'p'
  sx?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}

type TypographyProps = TypographyBase &
  (
    | {
        adaptive?: boolean
        adaptiveProps?: {
          min: string | number
          mid: string
          max?: string
        }
      }
    | {
        adaptive?: boolean
        adaptiveProps?: never
      }
  )

type RuleNames = 'Typography'

const getAdaptiveFontSize = ({
  adaptiveProps
}: {
  adaptiveProps: TypographyProps['adaptiveProps']
}) => {
  if (adaptiveProps) {
    return `clamp(${
      typeof adaptiveProps.min === 'number' ? adaptiveProps.min + 'px' : adaptiveProps.min
    }, ${adaptiveProps.mid}, ${adaptiveProps.max || adaptiveProps.mid})`
  }
  return 'clamp(16px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)'
}

const useStyles = createUseStyles<RuleNames, TypographyProps, ColorScheme>({
  Typography: ({ theme, adaptive, adaptiveProps }) => ({
    color: theme.color,
    display: 'inline-block',
    width: 'fit-content',
    wordBreak: 'break-word',
    hyphens: 'auto',
    wordWrap: 'break-word',
    overflowWrap: 'anywhere',
    ...(adaptive && { fontSize: getAdaptiveFontSize({ adaptiveProps }) })
  })
})

export default function Typography({
  variant = DEFAULT_VARIANT,
  sx,
  children,
  className,
  element,
  adaptive,
  adaptiveProps,
  ...props
}: TypographyProps) {
  const style = sx
  const theme = useTheme()
  const classes = useStyles({ theme, adaptive, adaptiveProps })

  if (variant === 'body' || variant === 'body-lg') {
    if (element) {
      return createElement(element, {
        style,
        children,
        className: clsx(className, classes.Typography),
        ...props
      })
    }
    return (
      <span className={clsx(className, classes.Typography)} style={style} {...props}>
        {children}
      </span>
    )
  }

  return createElement(element || variant, {
    style,
    children,
    className: clsx(className, classes.Typography),
    ...props
  })
}
