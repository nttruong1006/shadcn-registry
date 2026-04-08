import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Field, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputButtonGroup() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='input-button-group'>Search</FieldLabel>
      <ButtonGroup>
        <Input id='input-button-group' placeholder='Type to search...' />
        <Button variant='outline'>Search</Button>
      </ButtonGroup>
    </Field>
  )
}
