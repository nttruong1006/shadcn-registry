import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Combobox } from '@/registry/new-york/ui/combobox/components/combobox'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const AdvancedFilterValueSelectWithInfiniteQueryField = ({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()
  const { options, optionsInfiniteQuery, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    apiPath: 'apiPath' in selectedFilter ? selectedFilter.apiPath : undefined
  })

  // Template
  if (!('apiPath' in selectedFilter)) {
    return null
  }

  // Has any of
  if (formFilterOperation === 'hasAnyOf') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <MultiSelect
                buttonTriggerProps={{
                  isLoading: optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage
                }}
                commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
                commandInputProps={{
                  value: searchKeyword,
                  onValueChange: setSearchKeyword
                }}
                commandListProps={{
                  onScroll: (event) =>
                    fetchNextPage({
                      event,
                      infiniteQuery: optionsInfiniteQuery
                    })
                }}
                commandProps={{
                  shouldFilter: false
                }}
                onValueChange={field.handleChange}
                options={options}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                value={field.state.value as string[]}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <Combobox
              buttonTriggerProps={{
                isLoading: optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage
              }}
              commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
              commandInputProps={{
                value: searchKeyword,
                onValueChange: setSearchKeyword
              }}
              commandListProps={{
                onScroll: (event) =>
                  fetchNextPage({
                    event,
                    infiniteQuery: optionsInfiniteQuery
                  })
              }}
              commandProps={{
                shouldFilter: false
              }}
              onValueChange={(value) => {
                field.handleChange(value ?? '')
              }}
              options={options}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueSelectWithInfiniteQueryField
