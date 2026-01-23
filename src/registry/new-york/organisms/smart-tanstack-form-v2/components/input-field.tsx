import { Input } from '@/components/ui/input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type InputFieldOutputValue, useFieldContext } from './lib'

// Component
const InputField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<InputFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Input
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

export default InputField
