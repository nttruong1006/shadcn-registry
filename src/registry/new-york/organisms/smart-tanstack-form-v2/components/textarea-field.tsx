import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const TextareaField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<TextareaProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Textarea
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

export default TextareaField
