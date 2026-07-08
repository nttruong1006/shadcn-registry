import { NumberInput } from '@/components/molecules/number-input'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { NumberFieldInputValue } from './lib/schemas/number'

export default function NumberField({ label, disabled, ...props }: BaseSmartFormFieldComponentProps) {
  const field = useFieldContext<NumberFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <NumberInput
        disabled={disabled}
        id={`${field.form.formId}-${field.name}`}
        invalid={invalid}
        name={field.name}
        onFieldChange={field.handleChange}
        onValueChange={(event) => field.handleChange(event.value)}
        placeholder={`Enter ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
        value={field.state.value as number | string}
      />
    </SmartFormFieldContainer>
  )
}
