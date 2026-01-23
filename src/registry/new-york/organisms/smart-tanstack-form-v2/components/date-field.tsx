import { DatePicker, type DatePickerProps } from '@/components/ui/date-picker'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type DateFieldOutputValue, useFieldContext } from './lib'

// Component
const DateField = ({
  label,
  isDisabled,
  datePickerProps,
  ...props
}: BaseSmartFormFieldFieldProps & {
  datePickerProps?: Partial<DatePickerProps>
}) => {
  // Hooks
  const field = useFieldContext<DateFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <DatePicker
        id={field.name}
        value={field.state.value}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        isDisabled={isDisabled}
        onValueChange={field.handleChange as DatePickerProps['onValueChange']}
        {...datePickerProps}
      />
    </FieldContainer>
  )
}

export default DateField
