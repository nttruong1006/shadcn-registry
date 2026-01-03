import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const TextareaField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<TextareaProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Textarea
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

export default TextareaField
