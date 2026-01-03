import { PasswordInput, type PasswordInputProps } from '@/components/molecules/password-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const PasswordField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<PasswordInputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <PasswordInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        disabled={disabledFields?.[fieldData.code]}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FieldContainer>
  )
}

export default PasswordField
