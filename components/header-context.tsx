"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface HeaderContextType {
  showSecondaryHeader: boolean
  setShowSecondaryHeader: (show: boolean) => void
  isControlsOpen: boolean
  setIsControlsOpen: (open: boolean) => void
  onBack?: () => void
  setOnBack: (handler: (() => void) | undefined) => void
  onDownload?: () => void
  setOnDownload: (handler: (() => void) | undefined) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [showSecondaryHeader, setShowSecondaryHeader] = useState(false)
  const [isControlsOpen, setIsControlsOpen] = useState(false)
  const [onBack, setOnBack] = useState<(() => void) | undefined>(undefined)
  const [onDownload, setOnDownload] = useState<(() => void) | undefined>(undefined)

  return (
    <HeaderContext.Provider value={{
      showSecondaryHeader,
      setShowSecondaryHeader,
      isControlsOpen,
      setIsControlsOpen,
      onBack,
      setOnBack,
      onDownload,
      setOnDownload
    }}>
      {children}
    </HeaderContext.Provider>
  )
}

export function useHeader() {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }
  return context
}
