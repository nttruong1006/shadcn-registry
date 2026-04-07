import { Button } from '@/components/atoms/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'

export function PopoverAlignments() {
  return (
    <div className='flex gap-6'>
      <Popover>
        <PopoverTrigger
          render={
            <Button size='sm' variant='outline'>
              Start
            </Button>
          }
        />
        <PopoverContent align='start' className='w-40'>
          Aligned to start
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={
            <Button size='sm' variant='outline'>
              Center
            </Button>
          }
        />
        <PopoverContent align='center' className='w-40'>
          Aligned to center
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger
          render={
            <Button size='sm' variant='outline'>
              End
            </Button>
          }
        />
        <PopoverContent align='end' className='w-40'>
          Aligned to end
        </PopoverContent>
      </Popover>
    </div>
  )
}
