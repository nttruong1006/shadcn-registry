import { Button } from '@/components/atoms/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant='outline'>Hover</Button>} />
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
