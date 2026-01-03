import { Autocomplete } from '@/components/molecules/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext, useOptionsQuery } from './lib'

// Component
const AutocompleteWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<string>()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Autocomplete
        value={field.state.value}
        options={options}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        inputProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          'aria-invalid': isInvalid
        }}
        isLoading={optionsQuery.isFetching}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
