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
