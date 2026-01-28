import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'

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
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Combobox
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled,
          isLoading: optionsQuery.isFetching
        }}
        onValueChange={field.handleChange}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default SelectWithQueryField
