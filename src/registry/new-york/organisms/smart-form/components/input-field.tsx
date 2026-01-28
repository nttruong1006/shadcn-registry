import { Input } from '@/registry/new-york/ui/input/components/input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const InputField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <Input
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

export default InputField
