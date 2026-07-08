import { toast } from 'sonner'
import { Button } from '@/components/atoms/button'

export function SonnerRichColor() {
  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        onClick={() =>
          toast.success('Event has been created', {
            richColors: true
          })
        }
        variant='outline'
      >
        Success
      </Button>

      <Button
        onClick={() =>
          toast.info('Be at the area 10 minutes before the event time', {
            richColors: true
          })
        }
        variant='outline'
      >
        Info
      </Button>

      <Button
        onClick={() =>
          toast.warning('Event start time cannot be earlier than 8am', {
            richColors: true
          })
        }
        variant='outline'
      >
        Warning
      </Button>

      <Button
        onClick={() =>
          toast.error('Event has not been created', {
            richColors: true
          })
        }
        variant='outline'
      >
        Error
      </Button>

      <Button
        onClick={() =>
          toast.success('Event has been created', {
            closeButton: true,
            richColors: true
          })
        }
        variant='outline'
      >
        Close Button
      </Button>
    </div>
  )
}
