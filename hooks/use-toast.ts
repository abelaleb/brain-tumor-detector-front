// hooks/use-toast.ts
import { toast as sonnerToast } from "sonner"

type ToastVariant = "default" | "destructive" | "success" | "warning"

interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

export function useToast() {
  const toast = ({ title, description, variant = "default", duration = 4000 }: ToastOptions) => {
    sonnerToast(title, {
      description,
      duration,
      className: variant === "destructive"
        ? "bg-red-600 text-white"
        : variant === "success"
          ? "bg-green-600 text-white"
          : variant === "warning"
            ? "bg-yellow-500 text-black"
            : "",
    })
  }

  return { toast }
}
