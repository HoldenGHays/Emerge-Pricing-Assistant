"use client"

import { ChevronDown, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { App } from "@/types/app-switcher"

interface AppSwitcherProps {
  apps: App[]
  currentApp?: string
  supportHref?: string
}

export function AppSwitcher({ apps, currentApp, supportHref = "/support" }: AppSwitcherProps) {
  const activeApp = apps.find((app) => app.id === currentApp) || apps[0]
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#4C5967]/20 bg-white/80 px-6 backdrop-blur dark:border-[#4C5967]/40 dark:bg-[#00020D]/95">
      {/* Emerge Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center cursor-pointer transition-opacity hover:opacity-80">
          <svg
            width="129"
            height="40"
            viewBox="0 0 129 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-auto"
          >
            <g clipPath="url(#clip0_1_2)">
              <path
                d="M99.686 7.28374C102.865 7.28374 106 8.34961 109.046 9.993L104.808 31.9332C103.88 36.8186 100.392 39.9276 94.9176 39.9276H88.1181L88.6038 34.598H95.9772C97.4783 34.598 98.5379 33.4432 98.847 31.9332L99.3768 29.0907C97.9159 30.321 96.0722 30.9968 94.1669 31.0005C89.1777 31.0005 86.7935 26.648 87.7648 21.4516L88.5155 17.6765C89.7959 11.2365 93.4163 7.28374 99.686 7.28374ZM65.7767 7.28374C70.4568 7.28374 73.5914 10.1706 73.5914 13.9013C73.5914 18.2982 69.7944 21.496 62.9509 21.9402L59.5511 22.1622C59.1539 24.2053 59.8161 26.3371 62.9068 26.3371C65.3793 26.3371 67.94 25.4488 70.0594 24.6938L70.4568 29.7125C67.631 30.7785 64.9377 31.5778 62.0679 31.5778C56.1515 31.5778 52.1779 28.0248 53.5907 21.0075L54.2088 17.8985C55.5775 11.1033 59.2863 7.28374 65.7767 7.28374ZM121.232 7.28374C125.912 7.28374 129.047 10.1706 129.047 13.9013C129.047 18.2982 125.25 21.496 118.406 21.9402L115.007 22.1622C114.609 24.2053 115.272 26.3371 118.362 26.3371C120.835 26.3371 123.395 25.4488 125.515 24.6938L125.912 29.7125C123.086 30.7785 120.393 31.5778 117.523 31.5778C111.607 31.5778 107.633 28.0248 109.046 21.0075L109.664 17.8985C111.033 11.1033 114.742 7.28374 121.232 7.28374ZM22.5077 0L21.4922 5.32956H13.1918C10.2335 5.32956 9.43885 7.06157 9.04146 9.06031L8.37907 12.4357H18.7548L17.7834 17.7209H7.36361L6.52468 21.9846C6.12746 24.0275 6.25987 25.6709 9.21799 25.6709H17.6951L16.9004 29.8458C16.8237 30.5182 16.2484 31.0197 15.5759 31.0005H8.15839C1.84475 31.0005 -0.804427 27.6251 0.211038 22.5175L2.90435 8.52738C3.91982 3.3754 7.761 0 14.1189 0H22.5077ZM46.8797 7.28374C51.5157 7.28374 53.5907 10.1706 52.6194 15.1894L49.7937 29.8458C49.6965 30.5253 49.107 31.0226 48.425 31.0005H43.5242L46.4382 15.8999C46.9238 13.4128 46.3058 12.5245 44.5838 12.5245C43.1709 12.5245 41.7581 13.2796 40.4335 14.3899C40.3452 15.056 40.2569 15.7667 40.1245 16.4772L37.3429 31.0005H31.2941L34.2081 15.8999C34.6055 13.8125 34.4289 12.5245 32.8394 12.5245C31.3824 12.5245 29.4397 13.9013 28.1593 15.367L25.157 31.0005H19.1082L23.5674 7.86107H28.6008L28.4684 10.2594C30.1461 8.57177 32.2213 7.28374 34.6938 7.28374C37.5195 7.28374 39.2856 8.21643 40.0361 10.215C41.8905 8.61617 44.319 7.28374 46.8797 7.28374ZM87.9412 7.32813C88.674 7.3192 89.4037 7.42408 90.1047 7.63908L88.736 12.7911C88.1863 12.6614 87.6226 12.6017 87.0582 12.6133C85.2038 12.6133 83.1287 14.3011 81.8924 15.4558L78.8901 31.0005H72.8413L77.3007 7.86107H82.2898L82.2456 10.6591C83.7909 8.79376 85.822 7.32813 87.9412 7.32813ZM99.5534 12.5245C96.6835 12.5245 95.2707 14.4343 94.5202 18.2094L93.9904 21.0519C93.3721 24.2053 94.0345 25.7597 95.7563 25.7597C97.3459 25.7597 98.8912 24.6938 100.481 22.8729L102.379 13.1018C101.479 12.7403 100.522 12.5447 99.5534 12.5245ZM65.2026 12.5245C61.8029 12.5245 60.8316 15.367 60.3459 17.9429L62.8184 17.7653C66.0856 17.5433 67.5867 16.2109 67.5867 14.5675C67.5867 13.2796 66.7039 12.5245 65.2026 12.5245ZM120.658 12.5245C117.258 12.5245 116.287 15.367 115.801 17.9429L118.274 17.7653C121.541 17.5433 123.042 16.2109 123.042 14.5675C123.042 13.2796 122.159 12.5245 120.658 12.5245Z"
                className="fill-[#00020D] dark:fill-white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_2">
                <rect width="129" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>

      {/* App Switcher Dropdown */}
      <div className="flex-1 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 font-medium text-[#00020D] hover:bg-[#4C5967]/10 hover:text-[#00020D] dark:text-white dark:hover:bg-[#4C5967]/20 dark:hover:text-white">
              {activeApp?.name}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="z-[60] w-80 p-2 shadow-xl"
            style={{
              background: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05)), rgba(76,89,103,0.15)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(76,89,103,0.35)',
              borderRadius: '16px',
            }}
          >
            {apps.map((app) => {
              const isExternal = app.href.startsWith("http")
              const isActive = app.id === currentApp

              return (
                <DropdownMenuItem
                  key={app.id}
                  className="flex flex-col items-start gap-1 rounded-lg p-4 cursor-pointer hover:bg-[#4C5967]/20 focus:bg-[#4C5967]/20"
                  asChild
                >
                  <Link href={app.href}>
                    <div className="flex items-center gap-2 font-medium text-[#00020D] dark:text-white">
                      {app.name}
                      {isActive && (
                        <Badge color="blue" className="text-[10px] px-2 py-0.5">
                          ACTIVE
                        </Badge>
                      )}
                      {isExternal && !isActive && (
                        <svg className="h-3 w-3 text-[#6C8093]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm leading-relaxed text-[#4C5967] dark:text-[#AEB8C1]">
                      {app.description}
                    </div>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Support + Theme Toggle */}
      <div className="flex items-center gap-3">
        <Link
          href={supportHref}
          className="font-medium text-[#4C5967] transition-colors hover:text-[#00020D] dark:text-[#AEB8C1] dark:hover:text-white"
        >
          Support
        </Link>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#4C5967]/20 text-[#4C5967] transition hover:border-[#4C5967]/40 hover:bg-[#4C5967]/10 hover:text-[#00020D] dark:border-[#4C5967]/40 dark:text-[#AEB8C1] dark:hover:text-white"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  )
}
