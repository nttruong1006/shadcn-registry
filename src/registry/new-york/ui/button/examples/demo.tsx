import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'

// Component
export function ButtonDemo() {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-2 md:flex-row'>
      <Button variant='outline'>Button</Button>
      <Button aria-label='Submit' size='icon' variant='outline'>
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
