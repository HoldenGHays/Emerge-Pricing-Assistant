import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image"; // Import Image component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProcureOS Pricing Calculator",
  description: "Internal pricing calculator for Sales reps",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg dark:bg-slate-950/80">
            <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
              <div className="flex items-center">
                <Link href="/" className="mr-6">
                  <Image
                    src="/emerge_logo.svg"
                    alt="Emerge Logo"
                    width={129} // Original width from SVG
                    height={40} // Original height from SVG
                    className="h-8 w-auto filter invert dark:filter-none" // Changed class here
                  />
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <MainNav />
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="min-h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
