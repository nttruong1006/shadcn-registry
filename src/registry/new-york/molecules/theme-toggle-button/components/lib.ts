import z from 'zod'

// Theme schema
export const themeSchema = z.object({
  theme: z.union([z.literal('light'), z.literal('dark')])
})

// Theme
export type Theme = z.output<typeof themeSchema>['theme']

// Default theme local storage key
export const defaultThemeLocalStorageKey = 'theme'

// Get default theme
export const getDefaultTheme = () => {
  const themeReference = localStorage.getItem(defaultThemeLocalStorageKey)
  const { success, data } = themeSchema.safeParse({
    theme: themeReference
  })

  if (success) {
    return data.theme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Observe theme
export const observeTheme = (key = 'theme') => {
  const getTheme = () => {
    const themeReference = localStorage.getItem(key)
    return themeReference ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  }

  const isDark = getTheme() === 'dark'
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

  const observer = new MutationObserver(() => {
    const isDark =
      document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
    localStorage.setItem(key, isDark ? 'dark' : 'light')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
  })

  return observer
}

// Start position
export type StartPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

// Get circle cx
export const getCircleCx = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('left')) {
    return '0'
  }
  return '100'
}

// Get circle cy
export const getCircleCy = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('top')) {
    return '0'
  }
  return '100'
}

// Get circle blur cx
export const getCircleBlurCx = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('left')) {
    return '0'
  }
  return '100'
}

// Get circle blur cy
export const getCircleBlurCy = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('top')) {
    return '0'
  }
  return '100'
}
