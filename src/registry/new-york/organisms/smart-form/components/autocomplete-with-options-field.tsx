import {
  Autocomplete,
  type AutocompleteProps
} from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import type { AutocompleteFieldInputValue } from './lib/schema'

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
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Autocomplete
        inputProps={{
          id: field.name,
          disabled: isDisabled,
          'aria-invalid': isInvalid
        }}
        onValueChange={field.handleChange}
        options={options}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default AutocompleteWithOptionsField
