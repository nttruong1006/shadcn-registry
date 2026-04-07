import { toast } from 'sonner'
import { Button } from '@/components/atoms/button'

export function SonnerPosition() {
  return (
    <div className='flex flex-wrap justify-center gap-2'>
      <Button onClick={() => toast('Event has been created', { position: 'top-left' })} variant='outline'>
        Top Left
      </Button>
      <Button onClick={() => toast('Event has been created', { position: 'top-center' })} variant='outline'>
        Top Center
      </Button>
      <Button onClick={() => toast('Event has been created', { position: 'top-right' })} variant='outline'>
        Top Right
      </Button>
      <Button onClick={() => toast('Event has been created', { position: 'bottom-left' })} variant='outline'>
        Bottom Left
      </Button>
      <Button onClick={() => toast('Event has been created', { position: 'bottom-center' })} variant='outline'>
        Bottom Center
      </Button>
      <Button onClick={() => toast('Event has been created', { position: 'bottom-right' })} variant='outline'>
        Bottom Right
      </Button>
    </div>
  )
}
