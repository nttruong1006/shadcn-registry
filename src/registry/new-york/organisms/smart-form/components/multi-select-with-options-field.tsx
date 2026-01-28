import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const MultiSelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <MultiSelect
          {...field}
          buttonTriggerProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code]
          }}
          onValueChange={field.onChange}
          options={fieldData.config?.options ?? []}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
