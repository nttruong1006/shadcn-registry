import { Checkbox } from '@/components/atoms/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/atoms/field'

// Component
export function CheckboxDisabled() {
  // Template
  return (
    <FieldGroup className='mx-auto w-56'>
      <Field data-disabled orientation='horizontal'>
        <Checkbox disabled id='toggle-checkbox-disabled' name='toggle-checkbox-disabled' />
        <FieldLabel htmlFor='toggle-checkbox-disabled'>Enable notifications</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
