import { NumberInput } from '@/components/molecules/number-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib'

// Component
const NumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <NumberInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        {...fieldData.config?.numberInputProps}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        disabled={disabledFields?.[fieldData.code]}
        aria-invalid={isInvalid}
        onFieldChange={field.handleChange}
        onValueChange={(event) => field.handleChange(event.value)}
      />
    </FieldContainer>
  )
}

export default NumberField
