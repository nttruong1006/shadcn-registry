import { Combobox } from '@/components/atoms/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'
import type { SelectFieldInputValue } from './lib/schema'

// Component
const SelectWithQueryField = ({
  label,
  disabled,
  originalQueryPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsQuery>[0]) => {
  // Hooks
  const field = useFieldContext<SelectFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { options } = useOptionsQuery({
    originalQueryPath,
    dependencyFieldsValue
  })

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Combobox
        items={options}
        // buttonTriggerProps={{
        //   id: `${field.form.formId}-${field.name}`,
        //   disabled,
        //   isLoading: optionsQuery.isFetching
        // }}
        onValueChange={field.handleChange}
        // placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default SelectWithQueryField
