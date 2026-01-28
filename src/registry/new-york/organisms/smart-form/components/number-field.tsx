import { NumberInput } from '@/registry/new-york/molecules/number-input/components/number-input'
import FieldContainer, { type FieldProps } from './field-container'

// Component
const NumberField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field, fieldState }) => (
        <NumberInput
          {...field}
          {...fieldData.config?.numberInputProps}
          aria-invalid={fieldState.invalid}
          disabled={disabledFields?.[fieldData.code]}
          id={fieldData.code}
          onFieldChange={field.onChange}
          onValueChange={(event) => field.onChange(event.value)}
          placeholder={`Enter ${fieldData.label.toLowerCase()}`}
        />
      )}
    </FieldContainer>
  )
}

export default NumberField
