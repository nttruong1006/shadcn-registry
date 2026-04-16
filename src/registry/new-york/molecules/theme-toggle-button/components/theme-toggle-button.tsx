import { MoonIcon, SunIcon } from 'lucide-react'
import { useState } from 'react'
import { Button, type ButtonProps } from '@/components/atoms/button'
import { cn } from '@/utils/ui'
import {
  defaultThemeLocalStorageKey,
  getCircleBlurCx,
  getCircleBlurCy,
  getCircleCx,
  getCircleCy,
  getDefaultTheme,
  type Theme
} from './lib'

function ThemeIcon({ theme }: { theme: Theme | undefined }) {
  if (theme === 'light') {
    return <MoonIcon />
  }
  if (theme === 'dark') {
    return <SunIcon />
  }
  return null
}

type AnimationVariant = 'circle' | 'circle-blur' | 'gif' | 'polygon'

type StartPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type ThemeToggleButtonProps = Omit<ButtonProps, 'variant' | 'onClick'> & {
  themeLocalStorageKey?: string
  showLabel?: boolean
  variant?: AnimationVariant
  startPosition?: StartPosition
  url?: string // For gif variant
}

export function ThemeToggleButton({
  themeLocalStorageKey = defaultThemeLocalStorageKey,
  showLabel = false,
  variant = 'circle',
  startPosition = 'center',
  url,
  className,
  ...props
}: ThemeToggleButtonProps) {
  const [theme, setTheme] = useState<Theme>()

  const toggleTheme = () => {
    // Update theme
    document.startViewTransition(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      const isDark = newTheme === 'dark'

      setTheme(newTheme)
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    })

    // Inject animation styles for this specific transition
    const styleId = `theme-transition-${Date.now()}`
    const style = document.createElement('style')
    style.id = styleId

    // Generate animation CSS based on variant
    let css = ''
    const positions = {
      center: 'center',
      'top-left': 'top left',
      'top-right': 'top right',
      'bottom-left': 'bottom left',
      'bottom-right': 'bottom right'
    }

    if (variant === 'circle') {
      const cx = getCircleCx(startPosition)
      const cy = getCircleCy(startPosition)
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-expand 0.4s ease-out;
            transform-origin: ${positions[startPosition]};
          }
          @keyframes circle-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
            }
          }
        }
      `
    } else if (variant === 'circle-blur') {
      const cx = getCircleBlurCx(startPosition)
      const cy = getCircleBlurCy(startPosition)
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) { 
            animation: none;
          }
          ::view-transition-new(root) {
            animation: circle-blur-expand 0.5s ease-out;
            transform-origin: ${positions[startPosition]};
            filter: blur(0);
          }
          @keyframes circle-blur-expand {
            from {
              clip-path: circle(0% at ${cx}% ${cy}%);
              filter: blur(4px);
            }
            to {
              clip-path: circle(150% at ${cx}% ${cy}%);
              filter: blur(0);
            }
          }
        }
      `
    } else if (variant === 'gif' && url) {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: fade-out 0.4s ease-out;
          }
          ::view-transition-new(root) {
            animation: gif-reveal 2.5s cubic-bezier(0.4, 0, 0.2, 1);
            mask-image: url('${url}');
            mask-size: 0%;
            mask-repeat: no-repeat;
            mask-position: center;
          }
          @keyframes fade-out {
            to {
              opacity: 0;
            }
          }
          @keyframes gif-reveal {
            0% {
              mask-size: 0%;
            }
            20% {
              mask-size: 35%;
            }
            60% {
              mask-size: 35%;
            }
            100% {
              mask-size: 300%;
            }
          }
        }
      `
    } else if (variant === 'polygon') {
      css = `
        @supports (view-transition-name: root) {
          ::view-transition-old(root) {
            animation: none;
          }
          ::view-transition-new(root) {
            animation: ${theme === 'light' ? 'wipe-in-dark' : 'wipe-in-light'} 0.4s ease-out;
          }
          @keyframes wipe-in-dark {
            from {
              clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
          @keyframes wipe-in-light {
            from {
              clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            }
            to {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
          }
        }
      `
    }

    if (css) {
      style.textContent = css
      document.head.appendChild(style)

      // Clean up animation styles after transition
      const timer = setTimeout(() => {
        const styleEl = document.getElementById(styleId)
        if (styleEl) {
          styleEl.remove()
        }
        clearTimeout(timer)
      }, 3000)
    }
  }

  return (
    <Button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className={cn('relative overflow-hidden transition-all', className)}
      loading={!theme}
      onClick={toggleTheme}
      ref={() => {
        const defaultTheme = getDefaultTheme(themeLocalStorageKey)
        setTheme(defaultTheme)
      }}
      size={showLabel ? 'default' : 'icon'}
      variant='ghost'
      {...props}
    >
      <ThemeIcon theme={theme} />
      {showLabel && <span>{theme === 'light' ? 'Light' : 'Dark'}</span>}
    </Button>
  )
}
