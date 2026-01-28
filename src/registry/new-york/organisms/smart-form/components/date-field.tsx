import { DatePicker } from '@/registry/new-york/ui/date-picker/components/date-picker'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const DateField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <DatePicker
          {...field}
          id={fieldData.code}
          isDisabled={disabledFields?.[fieldData.code]}
          onValueChange={field.onChange}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default DateField
