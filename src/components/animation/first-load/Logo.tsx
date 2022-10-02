import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

import { useTheme } from '@/theme/hooks'
import { ColorScheme } from '@/theme/types'

type LogoProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  LogoProps?: React.CSSProperties
  FirstLogoProps?: React.CSSProperties
  SecondLogoProps?: React.CSSProperties
  DotProps?: React.CSSProperties
}

const useStyles = createUseStyles<
  'Logo' | 'FirstLogo' | 'SecondLogo' | 'Dot',
  LogoProps,
  ColorScheme
>({
  Logo: ({ theme, LogoProps }) => ({
    color: theme.color,
    display: 'flex',
    gap: '0.1em',
    ...LogoProps
  }),
  FirstLogo: ({ theme, FirstLogoProps }) => ({
    ...FirstLogoProps
  }),
  SecondLogo: ({ theme, SecondLogoProps }) => ({
    ...SecondLogoProps
  }),
  Dot: ({ theme, DotProps }) => ({
    ...DotProps
  })
})

export default function Logo({
  LogoProps,
  DotProps,
  SecondLogoProps,
  FirstLogoProps,
  className,
  ...props
}: LogoProps) {
  const theme = useTheme()
  const classes = useStyles({
    theme,
    LogoProps,
    DotProps,
    FirstLogoProps,
    SecondLogoProps
  })

  return (
    <div className={clsx(classes.Logo, className)} {...props}>
      <div className={classes.FirstLogo}>dr1ver</div>
      <div className={classes.Dot}>.</div>
      <div className={classes.SecondLogo}>dev</div>
    </div>
  )
}
