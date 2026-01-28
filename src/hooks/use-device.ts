import { useEffect, useState } from 'react'

// Use is mobile
export const useIsMobile = (mobileBreakpoint = 768) => {
  // States
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Effects
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < mobileBreakpoint)
    return () => mql.removeEventListener('change', onChange)
  }, [mobileBreakpoint])

  return isMobile
}
