import { ROUTES } from '@/components/routes/constants'

const navLinks = Object.keys(ROUTES).map(r => ({
  route: ROUTES[r as keyof typeof ROUTES],
  label: r
}))

export { navLinks }
