import { Field, FieldGroup, FieldLabel } from '@/components/atoms/field'
import { Switch } from '@/components/atoms/switch'

export function SwitchSizes() {
  return (
    <FieldGroup className='w-full max-w-40'>
      <Field orientation='horizontal'>
        <Switch id='switch-size-sm' size='sm' />
        <FieldLabel htmlFor='switch-size-sm'>Small</FieldLabel>
      </Field>
      <Field orientation='horizontal'>
        <Switch id='switch-size-default' size='default' />
        <FieldLabel htmlFor='switch-size-default'>Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
