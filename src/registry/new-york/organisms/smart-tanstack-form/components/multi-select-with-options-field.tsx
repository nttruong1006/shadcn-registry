import { MultiSelect, type MultiSelectProps } from '@/components/molecules/multi-select'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const MultiSelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<MultiSelectProps['value']>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <MultiSelect
        value={field.state.value}
        options={fieldData.config?.options ?? []}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        buttonTriggerProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code]
        }}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
