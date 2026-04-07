import { useEffect, useState } from 'react'
import { Progress } from '@/components/atoms/progress'

export function ProgressDemo() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress className='w-[60%]' value={progress} />
}
