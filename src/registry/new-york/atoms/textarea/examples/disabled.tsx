import { Field, FieldLabel } from '@/components/atoms/field'
import { Textarea } from '@/components/atoms/textarea'

export function TextareaDisabled() {
  return (
    <Field data-disabled>
      <FieldLabel htmlFor='textarea-disabled'>Message</FieldLabel>
      <Textarea disabled id='textarea-disabled' placeholder='Type your message here.' />
    </Field>
  )
}
