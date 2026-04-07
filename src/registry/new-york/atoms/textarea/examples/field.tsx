import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { Textarea } from '@/components/atoms/textarea'

export function TextareaField() {
  return (
    <Field>
      <FieldLabel htmlFor='textarea-message'>Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id='textarea-message' placeholder='Type your message here.' />
    </Field>
  )
}
