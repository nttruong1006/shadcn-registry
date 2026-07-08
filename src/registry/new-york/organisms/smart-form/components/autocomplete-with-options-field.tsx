import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { AutocompleteFieldInputValue } from './lib/schemas/autocomplete'

export default function AutocompleteWithOptionsField({
  label,
  disabled,
  options,
  ...props
}: BaseSmartFormFieldComponentProps & {
  options: string[]
}) {
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <Autocomplete items={options} onValueChange={field.handleChange} openOnInputClick value={field.state.value}>
        <AutocompleteInput
          aria-invalid={invalid}
          disabled={disabled}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
          showClear
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
    </SmartFormFieldContainer>
  )
}
