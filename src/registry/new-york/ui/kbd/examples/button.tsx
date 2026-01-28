import { Button } from '@/registry/new-york/ui/button/components/button'
import { Kbd } from '@/registry/new-york/ui/kbd/components/kbd'

// Component
export const KbdButton = () => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <Button className='pr-2' size='sm' variant='outline'>
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button className='pr-2' size='sm' variant='outline'>
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}
