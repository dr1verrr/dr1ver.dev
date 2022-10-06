import { ReactNode } from 'react'

import { Typography as UITypography } from '@/components/shared'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)

const Title = ({ children }: { children?: ReactNode }) => {
  return (
    <Typography size='md' sx={{ margin: 0, fontWeight: 400 }} variant='h2'>
      {children}
    </Typography>
  )
}

export default Title
