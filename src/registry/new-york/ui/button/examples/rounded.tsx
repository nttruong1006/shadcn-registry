import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'

// Component
export function ButtonRounded() {
  // Template
  return (
    <div className='flex flex-col gap-8'>
      <Button className='rounded-full' size='icon' variant='outline'>
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
