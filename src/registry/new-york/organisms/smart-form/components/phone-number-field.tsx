import { PhoneNumberInput } from '@/registry/new-york/molecules/phone-number-input/components/phone-number-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const PhoneNumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <PhoneNumberInput
          {...field}
          aria-invalid={fieldState.invalid}
          disabled={disabledFields?.[fieldData.code]}
          id={fieldData.code}
          onValueChange={field.onChange}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default PhoneNumberField
