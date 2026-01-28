import { Textarea } from '@/registry/new-york/ui/textarea/components/textarea'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const TextareaField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <Textarea
          {...field}
          aria-invalid={fieldState.invalid}
          disabled={disabledFields?.[fieldData.code]}
          id={fieldData.code}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default TextareaField
