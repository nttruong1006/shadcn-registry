import { PhoneNumberInput } from '@/components/molecules/phone-number-input'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { PhoneNumberFieldInputValue } from './lib/schemas/phone-number'

export default function PhoneNumberField({ label, disabled, ...props }: BaseSmartFormFieldComponentProps) {
  const field = useFieldContext<PhoneNumberFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <PhoneNumberInput
        aria-invalid={invalid}
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        name={field.name}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
      />
    </SmartFormFieldContainer>
  )
}
