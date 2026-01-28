import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { SelectFieldInputValue } from './lib/schema'

// Component
const SelectWithOptionsField = ({
  label,
  isDisabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: ComboboxProps['options']
}) => {
  // Hooks
  const field = useFieldContext<SelectFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Combobox
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled
        }}
        onValueChange={field.handleChange as ComboboxProps['onValueChange']}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default SelectWithOptionsField
