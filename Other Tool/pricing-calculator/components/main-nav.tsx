'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ComingSoonModal } from './coming-soon-modal'

export function MainNav() {
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <nav className="flex items-center space-x-8">
        <Link
          href="/"
          className={cn(
            "text-base font-medium transition-colors hover:text-slate-700 dark:hover:text-slate-200",
            pathname === "/" ? "text-slate-900 dark:text-slate-50" : "text-slate-500 dark:text-slate-400"
          )}
        >
          Internal Pricing Calculator
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className={cn(
            "text-base font-medium transition-colors hover:text-slate-700 dark:hover:text-slate-200",
            "text-slate-500 dark:text-slate-400"
          )}
        >
          Sales Collateral
        </button>
      </nav>
      <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
