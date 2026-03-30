import { MultiSelect, type MultiSelectProps } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { MultiSelectFieldInputValue } from './lib/schema'

// Component
const MultiSelectWithOptionsField = ({
  label,
  isDisabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: MultiSelectProps['options']
}) => {
  // Hooks
  const field = useFieldContext<MultiSelectFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <MultiSelect
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled
        }}
        onValueChange={field.handleChange}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
