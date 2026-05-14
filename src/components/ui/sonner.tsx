"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-emerald-600" />
        ),
        info: (
          <InfoIcon className="size-4 text-blue-600" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-amber-600" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-rose-600" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-neutral-600" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-white/95 group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-[0_12px_28px_rgba(0,0,0,0.12)] group-[.toaster]:backdrop-blur group-[.toaster]:rounded-xl font-serif",
          title: "text-sm font-semibold",
          description: "text-xs text-neutral-600",
          actionButton: "group-[.toast]:bg-neutral-900 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-900",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
