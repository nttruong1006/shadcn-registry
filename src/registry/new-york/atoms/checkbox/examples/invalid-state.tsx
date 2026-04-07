import { Checkbox } from '@/components/atoms/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/atoms/field'

export function CheckboxInvalid() {
  return (
    <FieldGroup className='mx-auto w-56'>
      <Field data-invalid orientation='horizontal'>
        <Checkbox aria-invalid id='terms-checkbox-invalid' name='terms-checkbox-invalid' />
        <FieldLabel htmlFor='terms-checkbox-invalid'>Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
