import { SaveIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Kbd } from '@/components/atoms/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function TooltipKeyboard() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button size='icon-sm' variant='outline'>
            <SaveIcon />
          </Button>
        }
      />
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
