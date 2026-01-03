import { MultiSelect, type MultiSelectProps } from '@/components/molecules/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext, useOptionsQuery } from './lib'

// Component
const MultiSelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<MultiSelectProps['value']>()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <MultiSelect
        value={field.state.value}
        options={options}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        buttonTriggerProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          isLoading: optionsQuery.isFetching
        }}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithQueryField
