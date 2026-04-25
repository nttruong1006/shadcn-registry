import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import { useGetOptionsQuery } from './lib/query'
import type { AutocompleteFieldInputValue } from './lib/schema'

export default function AutocompleteWithQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useGetOptionsQuery>[0]) {
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { getOptionsQuery, options } = useGetOptionsQuery({ originalApiPath, dependencyFieldsValue })

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Autocomplete items={options} onValueChange={field.handleChange} openOnInputClick value={field.state.value}>
        <AutocompleteInput
          aria-invalid={invalid}
          disabled={disabled || getOptionsQuery.isLoading}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        >
          {getOptionsQuery.isLoading && (
            <InputGroupAddon>
              <Spinner />
            </InputGroupAddon>
          )}
        </AutocompleteInput>

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
