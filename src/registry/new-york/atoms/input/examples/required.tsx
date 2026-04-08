import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputRequired() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='input-required'>
        Required Field <span className='text-destructive'>*</span>
      </FieldLabel>
      <Input id='input-required' placeholder='This field is required' required />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
