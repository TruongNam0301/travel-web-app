import { toast } from 'react-toastify'
import type { ToastContent, ToastOptions } from 'react-toastify'

type ToastVariant = 'success' | 'warning' | 'error' | 'info'

const DEFAULT_OPTIONS: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
}

type ToastInvoker = typeof toast.info

const toastByVariant: Record<ToastVariant, ToastInvoker> = {
  success: toast.success,
  warning: toast.warning,
  error: toast.error,
  info: toast.info,
}

export interface ShowToastOptions extends ToastOptions {
  variant?: ToastVariant
}

export const showToast = (
  content: ToastContent,
  { variant = 'info', ...options }: ShowToastOptions = {}
) => {
  const toastFn = toastByVariant[variant] ?? toast.info

  return toastFn(content, {
    ...DEFAULT_OPTIONS,
    ...options,
  })
}

export const dismissToast = toast.dismiss

export const updateToast = toast.update

type VariantlessOptions = Omit<ShowToastOptions, 'variant'>

export const showSuccessToast = (
  content: ToastContent,
  options?: VariantlessOptions
) => showToast(content, { ...options, variant: 'success' })

export const showWarningToast = (
  content: ToastContent,
  options?: VariantlessOptions
) => showToast(content, { ...options, variant: 'warning' })

export const showErrorToast = (
  content: ToastContent,
  options?: VariantlessOptions
) => showToast(content, { ...options, variant: 'error' })

export const showInfoToast = (
  content: ToastContent,
  options?: VariantlessOptions
) => showToast(content, { ...options, variant: 'info' })
