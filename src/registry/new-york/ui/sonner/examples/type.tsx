import { toast } from 'sonner'
import { Button } from '@/registry/new-york/ui/button/components/button'

// Component
export const SonnerType = () => {
  // Template
  return (
    <div className=''>
      <div className='flex flex-wrap gap-2'>
        {/* Default */}
        <Button onClick={() => toast('Event has been created')} variant='outline'>
          Default
        </Button>

        {/* Description */}
        <Button
          onClick={() =>
            toast.message('Event has been created', {
              description: 'Monday, January 3rd at 6:00pm'
            })
          }
          variant='outline'
        >
          Description
        </Button>

        {/* Success */}
        <Button onClick={() => toast.success('Event has been created')} variant='outline'>
          Success
        </Button>

        {/* Info */}
        <Button onClick={() => toast.info('Be at the area 10 minutes before the event time')} variant='outline'>
          Info
        </Button>

        {/* Warning */}
        <Button onClick={() => toast.warning('Event start time cannot be earlier than 8am')} variant='outline'>
          Warning
        </Button>

        {/* Error */}
        <Button onClick={() => toast.error('Event has not been created')} variant='outline'>
          Error
        </Button>

        {/* Promise */}
        <Button
          onClick={() => {
            toast.promise<{ name: string }>(
              () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Event' }), 2000)),
              {
                loading: 'Loading...',
                success: (data) => `${data.name} has been created`,
                error: 'Error'
              }
            )
          }}
          variant='outline'
        >
          Promise
        </Button>
      </div>
    </div>
  )
}
