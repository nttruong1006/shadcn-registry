import { NumberInput } from '@/components/molecules/number-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type NumberFieldInputValue, useFieldContext } from './lib'

// Component
const NumberField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<NumberFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <NumberInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        onFieldChange={field.handleChange}
        onValueChange={(event) => field.handleChange(event.value)}
      />
    </FieldContainer>
  )
}

export default NumberField
