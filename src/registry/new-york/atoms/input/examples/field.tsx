import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputField() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='input-field-username'>Username</FieldLabel>
      <Input id='input-field-username' placeholder='Enter your username' type='text' />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  )
}
