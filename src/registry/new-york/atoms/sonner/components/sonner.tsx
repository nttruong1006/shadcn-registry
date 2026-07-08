import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

export type Theme = ToasterProps['theme']

export const Toaster = ({ richColors = true, closeButton = true, ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<Theme>()

  const observeTheme = useCallback(() => {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    const theme = isDark ? 'dark' : 'light'
    setTheme(theme)
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(observeTheme)

    observer.observe(document.documentElement, {
      attributeFilter: ['class', 'data-theme'],
      attributes: true
    })

    return () => observer.disconnect()
  }, [observeTheme])

  return (
    <Sonner
      className='toaster group'
      closeButton={closeButton}
      icons={{
        error: <OctagonXIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
        success: <CircleCheckIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />
      }}
      ref={observeTheme}
      style={
        {
          '--border-radius': 'var(--radius)',
          '--normal-bg': 'var(--popover)',
          '--normal-border': 'var(--border)',
          '--normal-text': 'var(--popover-foreground)',
          '--toast-close-button-end': '0',
          '--toast-close-button-start': 'auto',
          '--toast-close-button-transform': 'translate(35%, -35%)'
        } as React.CSSProperties
      }
      theme={theme}
      toastOptions={{
        classNames: {
          closeButton: '!cursor-default',
          toast: 'cn-toast'
        },
        duration: 3000
      }}
      {...props}
    />
  )
}
