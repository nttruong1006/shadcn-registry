import {
  PasswordInput,
  type PasswordInputProps
} from '@/registry/new-york/molecules/password-input/components/password-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const PasswordField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<PasswordInputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <PasswordInput
        aria-invalid={isInvalid}
        disabled={disabledFields?.[fieldData.code]}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default PasswordField
