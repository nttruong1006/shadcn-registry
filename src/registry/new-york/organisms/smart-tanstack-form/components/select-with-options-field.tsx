import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const SelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<ComboboxProps['value']>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Combobox
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

export default SelectWithOptionsField
