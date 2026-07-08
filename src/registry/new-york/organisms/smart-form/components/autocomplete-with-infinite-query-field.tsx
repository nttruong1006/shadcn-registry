import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus
} from '@/components/atoms/autocomplete'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import { fetchNextPage, useGetOptionsInfiniteQuery } from './lib/query'
import type { AutocompleteFieldInputValue } from './lib/schemas/autocomplete'

export default function AutocompleteWithInfiniteQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldComponentProps & Parameters<typeof useGetOptionsInfiniteQuery>[0]) {
  const field = useFieldContext<AutocompleteFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { getOptionsInfiniteQuery, options } = useGetOptionsInfiniteQuery({
    dependencyFieldsValue,
    originalApiPath,
    selectedValue: field.state.value,
    valueAsLabel: true
  })

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
          disabled={disabled || getOptionsInfiniteQuery.isLoading}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
          showClear
        >
          {getOptionsInfiniteQuery.isLoading && (
            <InputGroupAddon>
              <Spinner />
            </InputGroupAddon>
          )}
        </AutocompleteInput>

        <AutocompleteContent>
          <AutocompleteList onScroll={(event) => fetchNextPage({ event, infiniteQuery: getOptionsInfiniteQuery })}>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>

          {getOptionsInfiniteQuery.isFetchingNextPage && (
            <AutocompleteStatus className='flex justify-center'>
              <Spinner />
            </AutocompleteStatus>
          )}
        </AutocompleteContent>
      </Autocomplete>
    </SmartFormFieldContainer>
  )
}
