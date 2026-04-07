import { Button } from '@/components/atoms/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function TooltipDisabled() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className='inline-block w-fit'>
            <Button disabled variant='outline'>
              Disabled
            </Button>
          </span>
        }
      />
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  )
}
