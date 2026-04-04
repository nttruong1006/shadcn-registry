import { Checkbox } from '@/components/atoms/checkbox'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from '@/components/atoms/field'
import { Label } from '@/components/atoms/label'

// Component
export function CheckboxDemo() {
  // Template
  return (
    <FieldGroup className='max-w-sm'>
      <Field orientation='horizontal'>
        <Checkbox id='terms-checkbox' name='terms-checkbox' />
        <Label htmlFor='terms-checkbox'>Accept terms and conditions</Label>
      </Field>
      <Field orientation='horizontal'>
        <Checkbox defaultChecked id='terms-checkbox-2' name='terms-checkbox-2' />
        <FieldContent>
          <FieldLabel htmlFor='terms-checkbox-2'>Accept terms and conditions</FieldLabel>
          <FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription>
        </FieldContent>
      </Field>
      <Field data-disabled orientation='horizontal'>
        <Checkbox disabled id='toggle-checkbox' name='toggle-checkbox' />
        <FieldLabel htmlFor='toggle-checkbox'>Enable notifications</FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation='horizontal'>
          <Checkbox id='toggle-checkbox-2' name='toggle-checkbox-2' />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>You can enable or disable notifications at any time.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
