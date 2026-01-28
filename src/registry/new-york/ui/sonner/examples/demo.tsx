import { toast } from 'sonner'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Toaster } from '@/registry/new-york/ui/sonner/components/sonner'

// Component
export const SonnerDemo = () => {
  // Template
  return (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo')
            }
          })
        }
        variant='outline'
      >
        Show Toast
      </Button>
    </div>
  )
}
