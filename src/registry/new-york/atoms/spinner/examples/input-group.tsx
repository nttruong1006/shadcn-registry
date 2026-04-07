import { ArrowUpIcon } from 'lucide-react'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea
} from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'

export function SpinnerInputGroup() {
  return (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <InputGroup>
        <InputGroupInput disabled placeholder='Send a message...' />
        <InputGroupAddon align='inline-end'>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea disabled placeholder='Send a message...' />
        <InputGroupAddon align='block-end'>
          <Spinner /> Validating...
          <InputGroupButton className='ml-auto' variant='default'>
            <ArrowUpIcon />
            <span className='sr-only'>Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
