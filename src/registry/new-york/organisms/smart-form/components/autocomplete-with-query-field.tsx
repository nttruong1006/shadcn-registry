import { Autocomplete } from '@/components/molecules/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useOptionsQuery } from './lib'

// Component
const AutocompleteWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field, fieldState }) => (
        <Autocomplete
          {...field}
          options={options}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
          inputProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            'aria-invalid': fieldState.invalid
          }}
          isLoading={optionsQuery.isFetching}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
