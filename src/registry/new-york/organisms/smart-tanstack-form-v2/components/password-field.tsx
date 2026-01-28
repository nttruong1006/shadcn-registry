import { PasswordInput } from '@/registry/new-york/molecules/password-input/components/password-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { PasswordFieldInputValue } from './lib/schema'

// Component
const PasswordField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<PasswordFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <PasswordInput
        aria-invalid={isInvalid}
        disabled={isDisabled}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default PasswordField
