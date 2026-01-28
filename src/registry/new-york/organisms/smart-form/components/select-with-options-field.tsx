import { Combobox } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const SelectWithOptionsField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <Combobox
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

export default SelectWithOptionsField
