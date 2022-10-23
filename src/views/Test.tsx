import { Box, CheckBox, Container } from '@/components/shared'

export default function Test() {
  return (
    <Container
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ padding: 20 }}>
        <CheckBox labelText='label' />
      </Box>
    </Container>
  )
}
