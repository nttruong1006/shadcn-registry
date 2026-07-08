import { Checkbox } from '@/components/atoms/checkbox'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { CheckboxFieldInputValue } from './lib/schemas/checkbox'

export default function CheckboxField({ label, disabled, ...props }: BaseSmartFormFieldComponentProps) {
  const field = useFieldContext<CheckboxFieldInputValue>()

  return (
    <SmartFormFieldContainer
      className='flex-row-reverse'
      errors={field.state.meta.errors}
      label={label}
      name={field.name}
      orientation='horizontal'
      {...props}
    >
      <Checkbox
        checked={field.state.value}
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        name={field.name}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
    </SmartFormFieldContainer>
  )
}
