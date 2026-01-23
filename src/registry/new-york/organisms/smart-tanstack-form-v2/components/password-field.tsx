import { PasswordInput } from '@/components/molecules/password-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type PasswordFieldInputValue, useFieldContext } from './lib'

// Component
const PasswordField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<PasswordFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <PasswordInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FieldContainer>
  )
}

export default PasswordField
