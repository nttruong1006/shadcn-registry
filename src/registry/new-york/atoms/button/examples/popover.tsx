import { BotIcon, ChevronDownIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@/components/atoms/popover'
import { Textarea } from '@/components/atoms/textarea'

export function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant='outline'>
        <BotIcon /> Copilot
      </Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button aria-label='Open Popover' size='icon' variant='outline'>
              <ChevronDownIcon />
            </Button>
          }
        />
        <PopoverContent align='end' className='rounded-xl text-sm'>
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>Describe your task in natural language.</PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel className='sr-only' htmlFor='task'>
              Task Description
            </FieldLabel>
            <Textarea className='resize-none' id='task' placeholder='I need to...' />
            <FieldDescription>Copilot will open a pull request for review.</FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
