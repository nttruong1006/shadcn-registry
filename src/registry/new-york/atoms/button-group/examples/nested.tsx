import { AudioLinesIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/atoms/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button size='icon' variant='outline'>
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder='Send a message...' />
          <Tooltip>
            <TooltipTrigger
              render={
                <InputGroupAddon align='inline-end'>
                  <AudioLinesIcon />
                </InputGroupAddon>
              }
            />
            <TooltipContent>Voice Mode</TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
