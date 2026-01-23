import { Autocomplete, type AutocompleteProps } from '@/components/molecules/autocomplete'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type AutocompleteFieldOutputValue, useFieldContext } from './lib'

// Component
const AutocompleteWithOptionsField = ({
  label,
  isDisabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: AutocompleteProps['options']
}) => {
  // Hooks
  const field = useFieldContext<AutocompleteFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

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
        onValueChange={field.handleChange}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
