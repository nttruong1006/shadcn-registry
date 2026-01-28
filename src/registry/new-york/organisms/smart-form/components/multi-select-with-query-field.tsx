import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useOptionsQuery } from './lib/query'

// Component
const MultiSelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <MultiSelect
          {...field}
          buttonTriggerProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            isLoading: optionsQuery.isFetching
          }}
          onValueChange={field.onChange}
          options={options}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default MultiSelectWithQueryField
