import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const SelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<ComboboxProps['value']>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Combobox
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

export default SelectWithOptionsField
