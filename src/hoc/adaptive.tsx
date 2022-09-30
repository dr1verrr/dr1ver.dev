import clsx from 'clsx'
import React from 'react'
import { createUseStyles } from 'react-jss'

type Sizes = 'lg' | 'md' | 'sm' | 'default' | 'xlg'

const sizes = {
  xlg: {
    min: '48px',
    mid: '4vw + 4vh'
  },
  lg: {
    min: '36px',
    mid: '2.7vw + 2.7vh'
  },
  md: {
    min: '24px',
    mid: '1.2vw + 1.2vh'
  },
  sm: {
    min: '14px',
    mid: '0.3vw + 0.3vh'
  },
  default: {
    min: '16px',
    mid: '0.5vw + 0.5vh'
  }
}

type AdaptiveProps =
  | {
      adaptiveProps: {
        min: string | number
        mid: string
        max?: string
      }
      size?: never
    }
  | {
      adaptiveProps?: never
      size: Sizes
    }
  | {
      adaptiveProps?: {
        min: string | number
        mid: string
        max?: string
      }
      size?: Sizes
    }

const useStyles = createUseStyles<'adaptive', AdaptiveProps>({
  adaptive: ({ adaptiveProps, size }) => ({
    ...(adaptiveProps && {
      style: {
        fontSize: `clamp(${
          typeof adaptiveProps.min === 'number'
            ? adaptiveProps.min + 'px'
            : adaptiveProps.min
        }, ${adaptiveProps.mid}, ${adaptiveProps.max || adaptiveProps.mid})`
      }
    }),
    ...(size && {
      fontSize: `clamp(${sizes[size].min}, ${sizes[size].mid}, ${sizes[size].mid})`
    })
  })
})

export default function adaptive<
  P extends React.DetailedHTMLProps<React.HTMLAttributes<any>, any>
>(WrappedComponent: React.ComponentType<P>): (props: P & AdaptiveProps) => JSX.Element {
  return ({ adaptiveProps, size, className, ...props }) => {
    const classes = useStyles({
      size: !adaptiveProps && !size ? 'default' : size,
      adaptiveProps
    })
    return (
      <WrappedComponent className={clsx(className, classes.adaptive)} {...(props as P)} />
    )
  }
}
