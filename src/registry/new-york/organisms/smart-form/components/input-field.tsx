import { Input } from '@/components/atoms/input'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { InputFieldInputValue } from './lib/schemas/input'

export default function InputField({ label, disabled, ...props }: BaseSmartFormFieldComponentProps) {
  const field = useFieldContext<InputFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
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
    </SmartFormFieldContainer>
  )
}
