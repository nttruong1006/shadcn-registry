import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const CheckboxField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<boolean>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Checkbox
        checked={field.state.value}
        disabled={disabledFields?.[fieldData.code]}
        id={field.name}
        name={field.name}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
    </FieldContainer>
  )
}

export default CheckboxField
