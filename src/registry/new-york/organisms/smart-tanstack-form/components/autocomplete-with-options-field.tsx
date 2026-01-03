import { Autocomplete } from '@/components/molecules/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const AutocompleteWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Autocomplete
        value={field.state.value}
        options={fieldData.config?.options ?? []}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        inputProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          'aria-invalid': isInvalid
        }}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
