import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputFile() {
  return (
    <Field className='max-w-xs'>
      <FieldLabel htmlFor='picture'>Picture</FieldLabel>
      <Input id='picture' type='file' />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
