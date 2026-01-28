import React from 'react'
import { observeTheme } from '@/registry/new-york/molecules/theme-toggle-button/components/lib'
import { ThemeToggleButton } from '@/registry/new-york/molecules/theme-toggle-button/components/theme-toggle-button'

const ThemeToggleButtonDemo = () => {
  // Effects
  React.useLayoutEffect(() => {
    const observer = observeTheme('starlight-theme')
    return () => observer.disconnect()
  }, [])

  return <ThemeToggleButton themeLocalStorageKey='starlight-theme' />
}

export default ThemeToggleButtonDemo
