import { PasswordInput } from '@/registry/new-york/molecules/password-input/components/password-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const PasswordField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <PasswordInput
          {...field}
          aria-invalid={fieldState.invalid}
          disabled={disabledFields?.[fieldData.code]}
          id={fieldData.code}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default PasswordField
