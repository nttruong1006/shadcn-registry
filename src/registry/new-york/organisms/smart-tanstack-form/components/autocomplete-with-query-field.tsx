import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'

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
        inputProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          'aria-invalid': isInvalid
        }}
        isLoading={optionsQuery.isFetching}
        onValueChange={field.handleChange}
        options={options}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
