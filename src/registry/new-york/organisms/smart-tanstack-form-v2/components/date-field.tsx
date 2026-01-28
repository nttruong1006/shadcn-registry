import { DatePicker, type DatePickerProps } from '@/registry/new-york/ui/date-picker/components/date-picker'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { DateFieldOutputValue } from './lib/schema'

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
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <DatePicker
        id={field.name}
        isDisabled={isDisabled}
        onValueChange={field.handleChange as DatePickerProps['onValueChange']}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
        {...datePickerProps}
      />
    </FieldContainer>
  )
}

export default DateField
