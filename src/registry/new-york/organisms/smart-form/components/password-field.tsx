import { PasswordInput } from '@/components/molecules/password-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { PasswordFieldInputValue } from './lib/schema'

export default function PasswordField({ label, disabled, ...props }: BaseSmartFormFieldFieldProps) {
  const field = useFieldContext<PasswordFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <PasswordInput
        aria-invalid={invalid}
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}
