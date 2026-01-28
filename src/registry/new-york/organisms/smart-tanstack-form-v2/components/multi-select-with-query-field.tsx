import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'
import type { MultiSelectFieldOutputValue } from './lib/schema'

// Component
const MultiSelectWithQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsQuery>[0]) => {
  // Hooks
  const field = useFieldContext<MultiSelectFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsQuery, options } = useOptionsQuery({
    originalApiPath,
    dependencyFieldsValue
  })

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <MultiSelect
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

export default MultiSelectWithQueryField
