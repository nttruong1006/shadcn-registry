import { MultiSelect, type MultiSelectProps } from '@/components/molecules/multi-select'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type MultiSelectFieldOutputValue, useFieldContext } from './lib'

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
  const field = useFieldContext<MultiSelectFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <MultiSelect
        value={field.state.value}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled
        }}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithOptionsField
