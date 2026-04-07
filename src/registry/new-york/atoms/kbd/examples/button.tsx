import { Button } from '@/components/atoms/button'
import { Kbd } from '@/components/atoms/kbd'

export function KbdButton() {
  return (
    <Button variant='outline'>
      Accept{' '}
      <Kbd className='translate-x-0.5' data-icon='inline-end'>
        ⏎
      </Kbd>
    </Button>
  )
}
