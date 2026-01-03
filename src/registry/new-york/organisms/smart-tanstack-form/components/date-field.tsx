import { DatePicker } from '@/components/ui/date-picker'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const DateField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<Date | null | undefined>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <DatePicker
        id={field.name}
        value={field.state.value}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default DateField
