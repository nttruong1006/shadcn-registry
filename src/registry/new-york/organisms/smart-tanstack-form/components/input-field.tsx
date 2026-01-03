import { Input, type InputProps } from '@/components/ui/input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const InputField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<InputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        disabled={disabledFields?.[fieldData.code]}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </FieldContainer>
  )
}

export default InputField
