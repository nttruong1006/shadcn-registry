import { PhoneNumberInput, type PhoneNumberInputProps } from '@/components/molecules/phone-number-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const PhoneNumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<PhoneNumberInputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <PhoneNumberInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        disabled={disabledFields?.[fieldData.code]}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default PhoneNumberField
