import { InputGroup, InputGroupAddon, InputGroupButton } from '@/components/atoms/input-group'
import { Textarea } from '@/components/atoms/textarea'

export function InputGroupCustom() {
  return (
    <div className='grid w-full max-w-sm gap-6'>
      <InputGroup>
        <Textarea
          className='flex min-h-16 w-full resize-none rounded-md border-0 px-3 py-2.5 text-base outline-none transition-[color,box-shadow] focus-visible:ring-0 md:text-sm dark:bg-transparent'
          data-slot='input-group-control'
          placeholder='Autoresize textarea...'
        />
        <InputGroupAddon align='block-end'>
          <InputGroupButton className='ml-auto' size='sm' variant='default'>
            Submit
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
