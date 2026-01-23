import { PhoneNumberInput } from '@/components/molecules/phone-number-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type PhoneNumberFieldInputValue, useFieldContext } from './lib'

// Component
const PhoneNumberField = ({ label, isDisabled, ...props }: BaseSmartFormFieldFieldProps) => {
  // Hooks
  const field = useFieldContext<PhoneNumberFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <PhoneNumberInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default PhoneNumberField
