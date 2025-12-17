import { MultiSelect } from '@/components/molecules/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useOptionsQuery } from './lib'

// Component
const MultiSelectWithQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <MultiSelect
          {...field}
          options={options}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
          buttonTriggerProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            isLoading: optionsQuery.isFetching
          }}
          onValueChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default MultiSelectWithQueryField
