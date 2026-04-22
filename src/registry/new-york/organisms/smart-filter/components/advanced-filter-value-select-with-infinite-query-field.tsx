import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'
import { Field, FieldError } from '@/components/atoms/field'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import type { FilterWithQuery } from './lib/base'
import { useAdvancedFilterForm } from './lib/form'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

export default function AdvancedFilterValueSelectWithInfiniteQueryField({
  index,
  selectedFilter: selectedFilterProp,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) {
  const anchor = useComboboxAnchor()
  const advancedFilterForm = useAdvancedFilterForm()
  const selectedFilter = selectedFilterProp as FilterWithQuery

  const { options, optionsInfiniteQuery, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    apiPath: selectedFilter.apiPath
  })
  const fetching = optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage

  // Template
  // Has any of
  if (formFilterOperation === 'hasAnyOf') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
        {(field) => {
          const selectedOptions = field.state.value as string[]
          const value = options.filter((item) => selectedOptions.includes(item.value))
          const invalid = field.state.meta.isTouched && !field.state.meta.isValid

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
                  {fetching && <Spinner className='text-muted-foreground' />}

                  <ComboboxValue>
                    {(value: typeof options) => {
                      return value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
                    }}
                  </ComboboxValue>

                  <ComboboxChipsInput
                    aria-invalid={invalid}
                    data-invalid={invalid}
                    disabled={fetching}
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

  // Others
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const value = options.find((item) => item.value === field.state.value) ?? null
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid

        return (
          <Field data-invalid={invalid}>
            <Combobox
              items={options}
              onValueChange={(value) => {
                field.handleChange(value?.value ?? '')
              }}
              value={value}
            >
              <ComboboxInput
                aria-invalid={invalid}
                data-invalid={invalid}
                disabled={fetching}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              >
                {fetching && (
                  <InputGroupAddon align='inline-start'>
                    <Spinner />
                  </InputGroupAddon>
                )}
              </ComboboxInput>

              <ComboboxContent>
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
