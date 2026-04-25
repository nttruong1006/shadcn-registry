import { PhoneNumberInput } from '@/components/molecules/phone-number-input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { PhoneNumberFieldInputValue } from './lib/schema'

export default function PhoneNumberField({ label, disabled, ...props }: BaseSmartFormFieldFieldProps) {
  const field = useFieldContext<PhoneNumberFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
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
    </FieldContainer>
  )
}
