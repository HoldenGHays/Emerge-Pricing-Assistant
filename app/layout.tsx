import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
import { AppSwitcher } from '@/components/app-switcher'
import { ThemeProvider } from '@/components/theme-provider'
import { HeaderProvider } from '@/components/header-context'
import { ConditionalSecondaryHeader } from '@/components/conditional-secondary-header'

export const metadata: Metadata = {
  title: 'Sales Collateral - ProcureOS',
  description: 'Sales Collateral tool for ProcureOS',
  generator: 'v0.dev',
}

const apps = [
  {
    id: "feature-comparison",
    name: "Feature Comparison",
    description: "Compare ProcureOS Core and Pro features to find the perfect plan",
    href: "https://v0-procure-os-feature-comparison.vercel.app/"
  },
  {
    id: "pricing-generator",
    name: "Pricing Packet Generator",
    description: "Generate a shareable pricing packet for client proposals",
    href: "/"
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderProvider>
            <AppSwitcher
              apps={apps}
              currentApp="pricing-generator"
              supportHref="/support"
            />
            <ConditionalSecondaryHeader />
            <main className="min-h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
              {children}
            </main>
          </HeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
