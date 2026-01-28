import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText
} from '@/registry/new-york/ui/input-group/components/input-group'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'

// Component
export const InputGroupSpinner = () => {
  // Template
  return (
    <div className='grid w-full max-w-sm gap-4'>
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder='Searching...' />
        <InputGroupAddon align='inline-end'>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder='Processing...' />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder='Saving changes...' />
        <InputGroupAddon align='inline-end'>
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput disabled placeholder='Refreshing data...' />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          <InputGroupText className='text-muted-foreground'>Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
