import { Button } from '@/registry/new-york/ui/button/components/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'

// Component
export const TooltipDemo = () => {
  // Template
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='outline'>Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
