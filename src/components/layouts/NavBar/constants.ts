import IconGithub from '@/components/icons/Github'
import IconLinktree from '@/components/icons/Linktree'
import IconTelegram from '@/components/icons/Telegram'
import { ROUTES } from '@/components/routes/constants'

const navLinks = Object.keys(ROUTES).map(r => ({
  route: ROUTES[r as keyof typeof ROUTES].path,
  label: r
}))

const socialLinks = [
  { icon: IconLinktree, link: 'https://linktr.ee/dr1ver' },
  { icon: IconGithub, link: 'https://github.com/dr1verrr' },
  { icon: IconTelegram, link: 'https://t.me/Dr1ver1' }
]

export { navLinks, socialLinks }
