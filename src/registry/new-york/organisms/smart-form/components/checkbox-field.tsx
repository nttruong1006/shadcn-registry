import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const CheckboxField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <Checkbox
          checked={field.value}
          disabled={disabledFields?.[fieldData.code]}
          id={fieldData.code}
          onCheckedChange={field.onChange}
        />
      )}
    </FieldContainer>
  )
}

export default CheckboxField
