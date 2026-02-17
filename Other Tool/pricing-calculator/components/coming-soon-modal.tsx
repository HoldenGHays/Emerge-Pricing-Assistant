'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">🎉 Coming Soon! 🎉</DialogTitle>
          <DialogDescription className="text-center pt-2">
            We're working hard to bring you this feature. Stay tuned!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
