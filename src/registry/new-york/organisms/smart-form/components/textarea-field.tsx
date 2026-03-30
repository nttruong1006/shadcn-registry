import { Textarea } from '@/registry/new-york/ui/textarea/components/textarea'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { TextareaFieldInputValue } from './lib/schema'

// Component
const TextareaField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<TextareaFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Textarea
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

export default TextareaField
