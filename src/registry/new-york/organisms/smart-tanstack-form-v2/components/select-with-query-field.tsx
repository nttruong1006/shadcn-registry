import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext, useOptionsQuery } from './lib'

// Component
const SelectWithQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsQuery>[0]) => {
  // Hooks
  const field = useFieldContext<ComboboxProps['value']>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsQuery, options } = useOptionsQuery({
    originalApiPath,
    dependencyFieldsValue
  })

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Combobox
        value={field.state.value}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled,
          isLoading: optionsQuery.isFetching
        }}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default SelectWithQueryField
