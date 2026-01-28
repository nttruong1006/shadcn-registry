import {
  PhoneNumberInput,
  type PhoneNumberInputProps
} from '@/registry/new-york/molecules/phone-number-input/components/phone-number-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const PhoneNumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<PhoneNumberInputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <PhoneNumberInput
        aria-invalid={isInvalid}
        disabled={disabledFields?.[fieldData.code]}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default PhoneNumberField
