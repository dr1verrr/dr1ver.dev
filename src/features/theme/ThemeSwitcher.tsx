import { CheckBox } from '@/components/shared'
import { useLayoutContext } from '@/components/wrappers/Layout'
import { useTheme } from '@/components/wrappers/Layout/theme'

export default function ThemeSwitcher() {
  const theme = useTheme()
  const { actions } = useLayoutContext()

  return (
    <CheckBox
      InputProps={{ onChange: actions.switchTheme }}
      checked={theme.mode === 'dark'}
      labelText='dark mode'
    />
  )
}
