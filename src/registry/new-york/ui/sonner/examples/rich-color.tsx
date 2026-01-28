import { toast } from 'sonner'
import { Button } from '@/registry/new-york/ui/button/components/button'

// Component
export const SonnerRichColor = () => {
  // Template
  return (
    <div className='flex flex-wrap gap-2'>
      {/* Success */}
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

      {/* Info */}
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

      {/* Warning */}
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

      {/* Error */}
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

      {/* Success button */}
      <Button
        onClick={() =>
          toast.success('Event has been created', {
            richColors: true,
            closeButton: true
          })
        }
        variant='outline'
      >
        Close Button
      </Button>
    </div>
  )
}
