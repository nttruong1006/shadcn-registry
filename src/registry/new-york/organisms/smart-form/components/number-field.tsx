import { NumberInput } from '@/registry/new-york/molecules/number-input/components/number-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { NumberFieldInputValue } from './lib/schema'

// Component
const NumberField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<NumberFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <NumberInput
        aria-invalid={isInvalid}
        disabled={isDisabled}
        id={field.name}
        name={field.name}
        onFieldChange={field.handleChange}
        onValueChange={(event) => field.handleChange(event.value)}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default NumberField
