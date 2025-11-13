import { FileTextIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons'
import { ROUTE } from '@/core/routes/routes.constants'

export const navigationItems = [
  { label: 'Plans', path: ROUTE.plans, icon: <HomeIcon /> },
  { label: 'Settings', path: ROUTE.settings, icon: <GearIcon /> },
  { label: 'Documents', path: ROUTE.documents, icon: <FileTextIcon /> },
]
