import {
  Container,
  Highlighted as UIHighlighted,
  Stack,
  Typography as UITypography
} from '@/components/shared'
import { adaptive } from '@/hoc'

const Typography = adaptive(UITypography)
const Highlighted = adaptive(UIHighlighted)

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <Container maxWidth='sm' style={{ margin: 0, padding: 0 }}>
      <Stack spacing='clamp(5px, 0.3vw + 0.3vh, 0.3vw + 0.3vh)' sx={{ flexWrap: 'wrap' }}>
        {tags.map((t, idx) => (
          <Highlighted
            key={idx}
            style={{
              padding: `clamp(5px, 0.3vh, 0.3vh) clamp(10px, 0.3vh + 0.3vw, 0.3vh + 0.3vw)`,
              borderRadius: '0.5em'
            }}
            variant='lightContrast'
          >
            <Typography
              sx={{ color: 'inherit', fontWeight: 600, wordBreak: 'break-all' }}
            >
              {t}
            </Typography>
          </Highlighted>
        ))}
      </Stack>
    </Container>
  )
}

export default Tags
