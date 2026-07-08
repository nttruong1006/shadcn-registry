import { DatePicker, type DatePickerProps } from '@/components/atoms/date-picker'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { DateFieldInputValue } from './lib/schemas/date'

export default function DateField({
  label,
  disabled,
  datePickerProps,
  ...props
}: BaseSmartFormFieldComponentProps & {
  datePickerProps?: Partial<DatePickerProps>
}) {
  const field = useFieldContext<DateFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <DatePicker
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        invalid={invalid}
        onValueChange={field.handleChange as DatePickerProps['onValueChange']}
        placeholder={`Select ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
        {...datePickerProps}
      />
    </SmartFormFieldContainer>
  )
}
