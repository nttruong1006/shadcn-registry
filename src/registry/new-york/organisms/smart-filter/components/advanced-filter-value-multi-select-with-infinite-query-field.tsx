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
import { Field, FieldError } from '@/components/atoms/field'
import { Spinner } from '@/components/atoms/spinner'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import type { FilterWithQuery } from './lib/base'
import { useAdvancedFilterForm } from './lib/form'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
export default function AdvancedFilterValueMultiSelectWithQueryField({
  index,
  selectedFilter: selectedFilterProp
}: AdvancedFilterValueFieldComponentProps) {
  const anchor = useComboboxAnchor()
  const advancedFilterForm = useAdvancedFilterForm()
  const selectedFilter = selectedFilterProp as FilterWithQuery

  const { options, optionsInfiniteQuery, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    apiPath: selectedFilter.apiPath
  })

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const selectedOptions = field.state.value as string[]
        const value = options.filter((item) => selectedOptions.includes(item.value))
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
        const firstFetching = optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage

        return (
          <Field data-invalid={invalid}>
            <Combobox
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
                {firstFetching && <Spinner className='text-muted-foreground' />}

                <ComboboxValue>
                  {(value: typeof options) => {
                    return value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
                  }}
                </ComboboxValue>

                <ComboboxChipsInput
                  aria-invalid={invalid}
                  data-invalid={invalid}
                  disabled={firstFetching}
                  placeholder={value.length > 0 ? '' : `Select ${selectedFilter.label.toLowerCase()}`}
                />
              </ComboboxChips>

              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                <ComboboxList onScroll={(event) => fetchNextPage({ event, infiniteQuery: optionsInfiniteQuery })}>
                  {(item: (typeof options)[number]) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>

                {optionsInfiniteQuery.isFetchingNextPage && (
                  <ComboboxStatus className='flex items-center justify-center'>
                    <Spinner />
                  </ComboboxStatus>
                )}
              </ComboboxContent>
            </Combobox>

            {invalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
