import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useOptionsQuery } from './lib/query'

// Component
const AutocompleteWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

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
          isLoading={optionsQuery.isFetching}
          onValueChange={field.onChange}
          options={options}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
