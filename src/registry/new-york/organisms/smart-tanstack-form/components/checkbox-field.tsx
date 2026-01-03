import { Checkbox } from '@/components/ui/checkbox'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const CheckboxField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<boolean>()

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        disabled={disabledFields?.[fieldData.code]}
        onCheckedChange={(checked) => field.handleChange(checked === true)}
      />
    </FieldContainer>
  )
}

export default CheckboxField
