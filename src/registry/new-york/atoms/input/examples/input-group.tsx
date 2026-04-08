import { InfoIcon } from 'lucide-react'
import { Field, FieldLabel } from '@/components/atoms/field'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/atoms/input-group'

export function InputInputGroup() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='input-group-url'>Website URL</FieldLabel>
      <InputGroup>
        <InputGroupInput id='input-group-url' placeholder='example.com' />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          <InfoIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
