import { MultiSelect, type MultiSelectProps } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'

// Component
const MultiSelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<MultiSelectProps['value']>()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <MultiSelect
        buttonTriggerProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          isLoading: optionsQuery.isFetching
        }}
        onValueChange={field.handleChange}
        options={options}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithQueryField
