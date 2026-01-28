import { Input, type InputProps } from '@/registry/new-york/ui/input/components/input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

// Component
const InputField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<InputProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Input
        aria-invalid={isInvalid}
        disabled={disabledFields?.[fieldData.code]}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default InputField
