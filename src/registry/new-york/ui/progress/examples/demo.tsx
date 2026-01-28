import { useEffect, useState } from 'react'
import { Progress } from '@/registry/new-york/ui/progress/components/progress'

// Component
export const ProgressDemo = () => {
  // States
  const [progress, setProgress] = useState(13)

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  // Template
  return <Progress className='w-[60%]' value={progress} />
}
