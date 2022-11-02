import { ReactNode } from 'react'

import { Box, Highlighted, Typography as UITypography } from '@/components/shared'
import { useTheme } from '@/components/wrappers/Layout/theme'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)

const Description = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme()

  return (
    <Box>
      <Highlighted variant='info.secondary'>
        <Typography
          element='p'
          sx={{ fontWeight: 400, color: theme.palette.lightContrast.color }}
        >
          {children}
        </Typography>
      </Highlighted>
    </Box>
  )
}

export default Description
