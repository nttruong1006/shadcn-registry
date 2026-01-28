import { PhoneNumberInput } from '@/registry/new-york/molecules/phone-number-input/components/phone-number-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { PhoneNumberFieldInputValue } from './lib/schema'

// Component
const PhoneNumberField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<PhoneNumberFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <PhoneNumberInput
        aria-invalid={isInvalid}
        disabled={isDisabled}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default PhoneNumberField
