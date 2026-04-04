import { Checkbox } from '@/components/atoms/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/atoms/field'

// Component
export function CheckboxBasic() {
  // Template
  return (
    <FieldGroup className='mx-auto w-56'>
      <Field orientation='horizontal'>
        <Checkbox id='terms-checkbox-basic' name='terms-checkbox-basic' />
        <FieldLabel htmlFor='terms-checkbox-basic'>Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
