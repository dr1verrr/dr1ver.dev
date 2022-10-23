import { ReactNode } from 'react'

import { Box, Typography as UITypography } from '@/components/shared'
import { useTheme } from '@/components/wrappers/Layout/theme'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)

const Description = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        border: `0.1em solid ${theme.palette.lightContrast.border}`,
        maxWidth: 'fit-content',
        padding: 'clamp(15px, 1vw + 1vh, 1vw + 1vh)'
      }}
    >
      <Typography
        element='p'
        sx={{ fontWeight: 400, color: theme.palette.lightContrast.color }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default Description
