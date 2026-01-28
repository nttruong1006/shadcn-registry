import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const AutocompleteWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <Autocomplete
          {...field}
          inputProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            'aria-invalid': fieldState.invalid
          }}
          onValueChange={field.onChange}
          options={fieldData.config?.options ?? []}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
