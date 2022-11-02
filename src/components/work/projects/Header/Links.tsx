import { IconGithub } from '@/components/icons'
import { Button as UIButton, Stack } from '@/components/shared'
import type { ButtonProps } from '@/components/shared/Button'
import { adaptive } from '@/hoc'

const Button = adaptive(UIButton)

const Links = ({
  githubLink,
  appLink,
  ButtonProps,
  LinkProps
}: {
  githubLink?: string
  appLink?: string
  ButtonProps?: ButtonProps
  LinkProps?: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
}) => {
  return (
    <Stack
      spacing='clamp(10px, 0.5vw, 0.5vw)'
      sx={{
        flexWrap: 'wrap',
        maxWidth: 'fit-content',
        justifyContent: 'center'
      }}
    >
      {githubLink && (
        <a href={githubLink} tabIndex={-1} target='_blank' {...LinkProps}>
          <Button icon={<IconGithub />} variant='lightContrast' {...ButtonProps}>
            Github
          </Button>
        </a>
      )}
      {appLink && (
        <a href={appLink} tabIndex={-1} target='_blank' {...LinkProps}>
          <Button variant='lightContrast' {...ButtonProps} style={{ height: '100%' }}>
            Application
          </Button>
        </a>
      )}
    </Stack>
  )
}

export default Links
