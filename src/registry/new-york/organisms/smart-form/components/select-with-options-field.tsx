import { Combobox } from '@/components/atoms/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { SelectFieldInputValue } from './lib/schema'

export default function SelectWithOptionsField({
  label,
  disabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: unknown[]
}) {
  const field = useFieldContext<SelectFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Combobox
        items={options}
        // buttonTriggerProps={{
        //   id: `${field.form.formId}-${field.name}`,
        //   disabled
        // }}
        onValueChange={field.handleChange}
        // placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}
