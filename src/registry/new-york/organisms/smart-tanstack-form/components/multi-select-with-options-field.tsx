import { MultiSelect, type MultiSelectProps } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const MultiSelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<MultiSelectProps['value']>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <MultiSelect
        buttonTriggerProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code]
        }}
        onValueChange={field.handleChange}
        options={fieldData.config?.options ?? []}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
