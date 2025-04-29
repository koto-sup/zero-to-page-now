
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useState } from "react"
import { X } from "lucide-react"
import { useEffect } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const [hoveredToasts, setHoveredToasts] = useState<{[id: string]: boolean}>({})

  // Track swipe movements for mobile
  const [touchStart, setTouchStart] = useState<{[id: string]: number}>({})
  const [touchEnd, setTouchEnd] = useState<{[id: string]: number}>({})

  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    setTouchStart({...touchStart, [id]: e.targetTouches[0].clientX})
  }

  const handleTouchMove = (id: string, e: React.TouchEvent) => {
    setTouchEnd({...touchEnd, [id]: e.targetTouches[0].clientX})
  }

  const handleTouchEnd = (id: string) => {
    if (!touchStart[id] || !touchEnd[id]) return
    
    const distance = touchStart[id] - touchEnd[id]
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe || isRightSwipe) {
      // Close toast on swipe
      const closeButton = document.querySelector(`[data-toast-id="${id}"] .close-button`) as HTMLButtonElement
      if (closeButton) {
        closeButton.click()
      }
    }
    
    // Reset values
    const newTouchStart = {...touchStart}
    const newTouchEnd = {...touchEnd}
    delete newTouchStart[id]
    delete newTouchEnd[id]
    setTouchStart(newTouchStart)
    setTouchEnd(newTouchEnd)
  }

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props} 
            className="group relative dark:bg-gray-800 dark:text-gray-100 shadow-lg"
            data-toast-id={id}
            onMouseEnter={() => setHoveredToasts({...hoveredToasts, [id]: true})}
            onMouseLeave={() => setHoveredToasts({...hoveredToasts, [id]: false})}
            onTouchStart={(e) => handleTouchStart(id, e)}
            onTouchMove={(e) => handleTouchMove(id, e)}
            onTouchEnd={() => handleTouchEnd(id)}
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="dark:text-white">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="dark:text-gray-300">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose 
              className={`absolute top-2 right-2 transition-opacity close-button ${
                hoveredToasts[id] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } dark:text-white`}
            >
              <X className="h-4 w-4" />
            </ToastClose>
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-16 z-[100] flex flex-col p-4 gap-2 w-full md:max-w-[420px] mx-auto left-0 right-0" />
    </ToastProvider>
  )
}
