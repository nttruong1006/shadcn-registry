import { Button } from '@/components/atoms/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function TooltipSides() {
  return (
    <div className='flex flex-wrap gap-2'>
      {(['left', 'top', 'bottom', 'right'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger
            render={
              <Button className='w-fit capitalize' variant='outline'>
                {side}
              </Button>
            }
          />
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
