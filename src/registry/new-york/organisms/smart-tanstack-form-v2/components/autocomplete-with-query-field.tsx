import { Autocomplete } from '@/components/molecules/autocomplete'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type AutocompleteFieldOutputValue, useFieldContext, useOptionsQuery } from './lib'

// Component
const AutocompleteWithQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsQuery>[0]) => {
  // Hooks
  const field = useFieldContext<AutocompleteFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsQuery, options } = useOptionsQuery({ originalApiPath, dependencyFieldsValue })

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Autocomplete
        value={field.state.value}
        options={options}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        inputProps={{
          id: field.name,
          disabled: isDisabled,
          'aria-invalid': isInvalid
        }}
        isLoading={optionsQuery.isFetching}
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithQueryField
