import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

// Toaster
export const Toaster = ({ richColors = true, closeButton = true, ...props }: ToasterProps) => {
  // States
  const [theme, setTheme] = useState<ToasterProps['theme']>()

  // Methods
  const observeTheme = useCallback(() => {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    const theme = isDark ? 'dark' : 'light'
    setTheme(theme)
  }, [])

  // Effects
  // Observe theme change
  useEffect(() => {
    const observer = new MutationObserver(observeTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })

    return () => observer.disconnect()
  }, [observeTheme])

  // Template
  return (
    <Sonner
      className='toaster group'
      closeButton={closeButton}
      icons={{
        success: <CircleCheckIcon className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <OctagonXIcon className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />
      }}
      ref={observeTheme}
      richColors={richColors}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          '--toast-close-button-start': 'auto',
          '--toast-close-button-end': '0',
          '--toast-close-button-transform': 'translate(35%, -35%)'
        } as React.CSSProperties
      }
      theme={theme}
      toastOptions={{
        duration: 3000,
        classNames: {
          closeButton: '!cursor-default'
        }
      }}
      {...props}
    />
  )
}
