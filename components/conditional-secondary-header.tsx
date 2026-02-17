"use client"

import { useHeader } from './header-context'
import { Button } from './ui/button'
import { ArrowLeft, Download } from 'lucide-react'

export function ConditionalSecondaryHeader() {
  const { showSecondaryHeader, isControlsOpen, setIsControlsOpen, onBack, onDownload } = useHeader()

  if (!showSecondaryHeader) {
    return null
  }

  return (
    <header className="sticky top-16 z-40 flex h-16 w-full items-center justify-between border-b bg-[#ffffff] dark:bg-gray-900 border-[#e4e4e7] dark:border-gray-700 px-6">
      <div className="flex items-center gap-3">
        <Button
          onClick={onBack}
          className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Button>
        
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
        
        <Button
          onClick={onDownload}
          className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Download</span>
        </Button>
      </div>
    </header>
  )
}
