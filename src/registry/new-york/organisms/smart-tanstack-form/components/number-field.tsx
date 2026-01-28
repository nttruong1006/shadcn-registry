import { NumberInput } from '@/registry/new-york/molecules/number-input/components/number-input'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'

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
        aria-invalid={isInvalid}
        disabled={disabledFields?.[fieldData.code]}
        onFieldChange={field.handleChange}
        onValueChange={(event) => field.handleChange(event.value)}
        placeholder={`Enter ${fieldData.label.toLowerCase()}`}
      />
    </FieldContainer>
  )
}

export default NumberField
