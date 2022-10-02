import emailjs from '@emailjs/browser'
import React, { useEffect, useRef, useState } from 'react'

import Box from '@/components/shared/Box'
import UIButton from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Stack from '@/components/shared/Stack'
import TextField from '@/components/shared/TextField'
import UITypography from '@/components/shared/Typography'
import SpinnerCircle from '@/components/spinners/SpinnerCircle'
import adaptive from '@/hoc/adaptive'
import { EMAILJS } from '@/services/emailjs/constants'

const STATUS = {
  pending: 'Submitting...',
  success: 'Submitted.',
  error: 'Something went wrong.'
}

const TIMEOUT_CLEAR_DELAY = 2000

const Button = adaptive(UIButton)
const Typography = adaptive(UITypography)

export default function Contact() {
  const [status, setStatus] = useState({ text: '' })
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  let timeout = useRef<NodeJS.Timer>()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    if (formRef.current) {
      try {
        setLoading(true)
        setStatus({ text: STATUS.pending })
        emailjs.sendForm(
          EMAILJS.serviceId,
          EMAILJS.templateId,
          formRef.current,
          EMAILJS.publicKey
        )
        setStatus({ text: STATUS.success })
      } catch (error: any) {
        setStatus({ text: error?.text || error?.message || STATUS.error })
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (status.text && !loading) {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        setStatus({ text: '' })
      }, TIMEOUT_CLEAR_DELAY)
    }
  }, [status, loading])

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
      }}
    >
      <Box
        style={{
          width: '100%',
          padding: '0px clamp(0px, 20%, 20%)'
        }}
      >
        <form ref={formRef} action='' onSubmit={onSubmit}>
          <Stack direction='column' sx={{ padding: 'clamp(75px, 7vh, 7vh) 0' }}>
            <Typography
              size='lg'
              sx={{ fontWeight: 300, margin: 0, padding: '0 0 clamp(50px, 3vh, 3vh)' }}
              variant='h3'
            >
              Contact Me
            </Typography>
            <Stack direction='column' spacing='clamp(20px, 1.5vh, 1.5vh)'>
              <Stack direction='column' spacing='clamp(5px, 1vh, 1vh)'>
                <label htmlFor='user_name'>
                  <Typography>Name: </Typography>
                </label>
                <TextField
                  autoFocus
                  required
                  id='user_name'
                  minLength={5}
                  name='user_name'
                  sx={{
                    fontSize: 'clamp(16px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)',
                    padding: '0.75em'
                  }}
                  type='text'
                />
              </Stack>
              <Stack direction='column' spacing='clamp(5px, 1vh, 1vh)'>
                <label htmlFor='user_email'>
                  <Typography>Email: </Typography>
                </label>
                <TextField
                  required
                  id='user_email'
                  minLength={1}
                  name='user_email'
                  sx={{
                    fontSize: 'clamp(16px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)',
                    padding: '0.75em'
                  }}
                  type='email'
                />
              </Stack>
              <Stack direction='column' spacing='clamp(5px, 1vh, 1vh)'>
                <label htmlFor='message'>
                  <Typography>Message: </Typography>
                </label>
                <TextField
                  multiline
                  required
                  id='message'
                  minLength={50}
                  name='message'
                  sx={{
                    fontSize: 'clamp(16px, 0.5vw + 0.5vh, 0.5vw + 0.5vh)',
                    padding: '0.75em',
                    resize: 'none',
                    height: 'clamp(150px, 10vh, 10vh)'
                  }}
                  type='text'
                />
              </Stack>
              <Button
                style={{ padding: '1em 2em' }}
                type='submit'
                variant='action.secondary'
              >
                Submit
              </Button>
              {(loading || status.text) && (
                <Stack>
                  {loading && <SpinnerCircle size='1vw + 1vh' />}
                  <Typography>{status.text}</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}
