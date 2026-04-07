import { Field, FieldLabel } from '@/components/atoms/field'
import { Switch } from '@/components/atoms/switch'

export function SwitchDisabled() {
  return (
    <Field className='w-fit' data-disabled orientation='horizontal'>
      <Switch disabled id='switch-disabled-unchecked' />
      <FieldLabel htmlFor='switch-disabled-unchecked'>Disabled</FieldLabel>
    </Field>
  )
}
