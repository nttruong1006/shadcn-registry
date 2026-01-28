import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const AutocompleteWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Autocomplete
        inputProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          'aria-invalid': isInvalid
        }}
        onValueChange={field.handleChange}
        options={fieldData.config?.options ?? []}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
