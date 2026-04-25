import { Input } from '@/components/atoms/input'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { InputFieldInputValue } from './lib/schema'

export default function InputField({ label, disabled, ...props }: BaseSmartFormFieldFieldProps) {
  const field = useFieldContext<InputFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Input
        aria-invalid={invalid}
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}
