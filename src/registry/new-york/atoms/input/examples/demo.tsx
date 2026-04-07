import { Field, FieldDescription, FieldLabel } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'

export function InputDemo() {
  return (
    <Field>
      <FieldLabel htmlFor='input-demo-api-key'>API Key</FieldLabel>
      <Input id='input-demo-api-key' placeholder='sk-...' type='password' />
      <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
    </Field>
  )
}
