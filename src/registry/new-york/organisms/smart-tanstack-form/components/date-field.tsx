import { DatePicker } from '@/registry/new-york/ui/date-picker/components/date-picker'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const DateField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<Date | null | undefined>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <DatePicker
        id={field.name}
        isDisabled={disabledFields?.[fieldData.code]}
        onValueChange={field.handleChange}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default DateField
