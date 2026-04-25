import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'
import { Spinner } from '@/components/atoms/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { updateSelectedItemReferencesAndGetItems } from './lib/base'
import { useFieldContext } from './lib/form'
import { fetchNextPage, useGetOptionsInfiniteQuery } from './lib/query'
import type { MultiSelectFieldInputValue } from './lib/schema'

export default function MultiSelectWithInfiniteQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useGetOptionsInfiniteQuery>[0]) {
  const anchor = useComboboxAnchor()
  const field = useFieldContext<MultiSelectFieldInputValue>()

  const { getOptionsInfiniteQuery, options, searchKeyword, debouncedSearchKeyword, setSearchKeyword } =
    useGetOptionsInfiniteQuery({
      originalApiPath,
      dependencyFieldsValue,
      selectedValue: field.state.value.length > 0 ? field.state.value.join(',') : null
    })

  const value = options.filter((item) => field.state.value.includes(item.value))
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const items = updateSelectedItemReferencesAndGetItems({ value, queryData: options })

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Combobox
        filter={null}
        inputValue={searchKeyword}
        items={options}
        multiple
        onInputValueChange={setSearchKeyword}
        onValueChange={(value) => {
          field.handleChange(value.map((item) => item.value))
        }}
        value={value}
      >
        <ComboboxChips ref={anchor}>
          {getOptionsInfiniteQuery.isLoading && <Spinner className='text-muted-foreground' />}

          <ComboboxValue>
            {(value: typeof options) => {
              return value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
            }}
          </ComboboxValue>

          <ComboboxChipsInput
            aria-invalid={invalid}
            data-invalid={invalid}
            disabled={disabled || getOptionsInfiniteQuery.isLoading}
            id={`${field.form.formId}-${field.name}`}
            placeholder={
              value.length > 0 ? undefined : `Select ${typeof label === 'string' ? label.toLowerCase() : 'information'}`
            }
          />
        </ComboboxChips>

        <ComboboxContent anchor={anchor}>
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
    </FieldContainer>
  )
}
