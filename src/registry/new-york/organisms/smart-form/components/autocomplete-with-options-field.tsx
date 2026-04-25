import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { AutocompleteFieldInputValue } from './lib/schema'

export default function AutocompleteWithOptionsField({
  label,
  disabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: string[]
}) {
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Autocomplete items={options} onValueChange={field.handleChange} openOnInputClick value={field.state.value}>
        <AutocompleteInput
          aria-invalid={invalid}
          disabled={disabled}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        />
        <AutocompleteContent>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </FieldContainer>
  )
}
