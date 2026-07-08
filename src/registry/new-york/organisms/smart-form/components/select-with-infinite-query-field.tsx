import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus
} from '@/components/atoms/combobox'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import SmartFormFieldContainer from './field-container'
import { type BaseSmartFormFieldComponentProps, updateSelectedItemReferencesAndGetItems } from './lib/base'
import { useFieldContext } from './lib/form'
import { fetchNextPage, useGetOptionsInfiniteQuery } from './lib/query'
import type { SelectFieldInputValue } from './lib/schemas/select'

export default function SelectWithInfiniteQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldComponentProps & Parameters<typeof useGetOptionsInfiniteQuery>[0]) {
  const field = useFieldContext<SelectFieldInputValue>()

  const { getOptionsInfiniteQuery, options, searchKeyword, debouncedSearchKeyword, setSearchKeyword } =
    useGetOptionsInfiniteQuery({
      dependencyFieldsValue,
      originalApiPath,
      selectedValue: field.state.value
    })

  const value = options.find((item) => item.value === field.state.value) ?? null
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const items = updateSelectedItemReferencesAndGetItems({
    queryData: options,
    value
  })

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <Combobox
        filter={null}
        inputValue={searchKeyword}
        items={items}
        onInputValueChange={setSearchKeyword}
        onValueChange={(event) => {
          field.handleChange(event?.value ?? null)
        }}
        value={value}
      >
        <ComboboxInput
          aria-invalid={invalid}
          data-invalid={invalid}
          disabled={disabled || getOptionsInfiniteQuery.isLoading}
          id={`${field.form.formId}-${field.name}`}
          placeholder={`Select ${typeof label === 'string' ? label.toLowerCase() : 'information'}`}
          showClear
        >
          {getOptionsInfiniteQuery.isLoading && (
            <InputGroupAddon align='inline-start'>
              <Spinner />
            </InputGroupAddon>
          )}
        </ComboboxInput>

        <ComboboxContent>
          {getOptionsInfiniteQuery.isFetching && !getOptionsInfiniteQuery.isFetchingNextPage && (
            <ComboboxStatus className='flex items-center gap-2'>
              <Spinner />
              <span>Searching for "{debouncedSearchKeyword}"...</span>
            </ComboboxStatus>
          )}

          {!getOptionsInfiniteQuery.isFetching && items.length === 0 && (
            <ComboboxEmpty>No matched for "{debouncedSearchKeyword}"</ComboboxEmpty>
          )}

          <ComboboxList onScroll={(event) => fetchNextPage({ event, infiniteQuery: getOptionsInfiniteQuery })}>
            {(item: (typeof items)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>

          {getOptionsInfiniteQuery.isFetchingNextPage && (
            <ComboboxStatus className='flex justify-center'>
              <Spinner />
            </ComboboxStatus>
          )}
        </ComboboxContent>
      </Combobox>
    </SmartFormFieldContainer>
  )
}
