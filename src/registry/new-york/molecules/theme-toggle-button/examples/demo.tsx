import { useLayoutEffect } from 'react'
import { observeTheme } from '@/components/molecules/theme-toggle-button/lib'
import { ThemeToggleButton } from '@/components/molecules/theme-toggle-button/theme-toggle-button'

export function ThemeToggleButtonDemo() {
  useLayoutEffect(() => {
    const observer = observeTheme('starlight-theme')
    return () => observer.disconnect()
  }, [])

  return <ThemeToggleButton themeLocalStorageKey='starlight-theme' />
}
