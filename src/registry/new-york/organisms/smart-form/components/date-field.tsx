import { toDate } from 'date-fns'
import { DatePicker, type DatePickerProps } from '@/components/atoms/date-picker'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { DateFieldInputValue } from './lib/schema'

export default function DateField({
  label,
  disabled,
  datePickerProps,
  ...props
}: BaseSmartFormFieldFieldProps & {
  datePickerProps?: Partial<DatePickerProps>
}) {
  const field = useFieldContext<DateFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <DatePicker
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        invalid={invalid}
        onValueChange={field.handleChange as DatePickerProps['onValueChange']}
        placeholder={`Select ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value ? toDate(field.state.value) : null}
        {...datePickerProps}
      />
    </FieldContainer>
  )
}
