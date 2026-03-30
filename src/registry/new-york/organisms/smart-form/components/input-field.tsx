import { Input } from '@/registry/new-york/ui/input/components/input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { InputFieldInputValue } from './lib/schema'

// Component
const InputField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<InputFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Input
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

export default InputField
