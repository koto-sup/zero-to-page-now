
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="group relative dark:bg-gray-800 dark:text-gray-100">
            <div className="grid gap-1">
              {title && <ToastTitle className="dark:text-white">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="dark:text-gray-300">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute top-2 right-2 transition-opacity opacity-100 dark:text-white" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 right-0 flex flex-col p-4 gap-2 w-full md:max-w-[420px] z-[100]" />
    </ToastProvider>
  )
}
