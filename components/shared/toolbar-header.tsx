"use client"

import { Button } from "@/components/ui/button"

interface ToolbarHeaderProps {
  isControlsOpen: boolean
  setIsControlsOpen: (open: boolean) => void
}

export function ToolbarHeader({ isControlsOpen, setIsControlsOpen }: ToolbarHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-[#ffffff] dark:bg-gray-900 border-[#e4e4e7] dark:border-gray-700 px-6">
      <Button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2"
      >
        <span className="text-sm font-medium">Edit</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isControlsOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </header>
  )
}
