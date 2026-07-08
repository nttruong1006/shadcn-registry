import z from 'zod'

export const themeSchema = z.object({
  theme: z.union([z.literal('light'), z.literal('dark')])
})

export type Theme = z.output<typeof themeSchema>['theme']

export const defaultThemeLocalStorageKey = 'theme'

export const getDefaultTheme = (themeLocalStorageKey: string) => {
  const themeReference = localStorage.getItem(themeLocalStorageKey)

  const { success, data } = themeSchema.safeParse({
    theme: themeReference
  })

  if (success) {
    return data.theme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const observeTheme = (themeLocalStorageKey: string) => {
  const getTheme = () => {
    const themeReference = localStorage.getItem(themeLocalStorageKey)
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
    localStorage.setItem(themeLocalStorageKey, isDark ? 'dark' : 'light')
  })

  observer.observe(document.documentElement, {
    attributeFilter: ['class', 'data-theme'],
    attributes: true
  })

  return observer
}

export type StartPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const getCircleCx = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('left')) {
    return '0'
  }
  return '100'
}

export const getCircleCy = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('top')) {
    return '0'
  }
  return '100'
}

export const getCircleBlurCx = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('left')) {
    return '0'
  }
  return '100'
}

export const getCircleBlurCy = (startPosition: string) => {
  if (startPosition === 'center') {
    return '50'
  }
  if (startPosition.includes('top')) {
    return '0'
  }
  return '100'
}
