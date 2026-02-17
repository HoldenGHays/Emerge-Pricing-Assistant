export interface App {
  id: string
  name: string
  description: string
  href: string
  isActive?: boolean
}

export interface AppSwitcherProps {
  apps: App[]
  currentApp?: string
  onAppChange?: (app: App) => void
  supportHref?: string
}
