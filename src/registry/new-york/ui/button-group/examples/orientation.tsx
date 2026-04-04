import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'

// Component
export function ButtonGroupOrientation() {
  // Template
  return (
    <ButtonGroup aria-label='Media controls' className='h-fit' orientation='vertical'>
      <Button size='icon' variant='outline'>
        <PlusIcon />
      </Button>
      <Button size='icon' variant='outline'>
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
