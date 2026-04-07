import { useState } from 'react'
import { Progress } from '@/components/atoms/progress'
import { Slider } from '@/components/atoms/slider'

export function ProgressControlled() {
  const [value, setValue] = useState(50)

  return (
    <div className='flex w-full max-w-sm flex-col gap-4'>
      <Progress className='w-full' value={value} />
      <Slider max={100} min={0} onValueChange={(value) => setValue(value as number)} step={1} value={value} />
    </div>
  )
}
