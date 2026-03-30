import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsQuery } from './lib/query'
import type { AutocompleteFieldInputValue } from './lib/schema'

// Component
const AutocompleteWithQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsQuery>[0]) => {
  // Hooks
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsQuery, options } = useOptionsQuery({ originalApiPath, dependencyFieldsValue })

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Autocomplete
        inputProps={{
          id: field.name,
          disabled: isDisabled,
          'aria-invalid': isInvalid
        }}
        isLoading={optionsQuery.isFetching}
        onValueChange={field.handleChange}
        options={options}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
