import { Textarea, type TextareaProps } from '@/registry/new-york/ui/textarea/components/textarea'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const TextareaField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<TextareaProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Textarea
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

export default TextareaField
