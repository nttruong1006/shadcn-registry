import { Checkbox } from '@/components/atoms/checkbox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { CheckboxFieldInputValue } from './lib/schema'

export default function CheckboxField({ label, disabled, ...props }: BaseSmartFormFieldFieldProps) {
  const field = useFieldContext<CheckboxFieldInputValue>()

  return (
    <FieldContainer
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
    </FieldContainer>
  )
}
