import { MultiSelect } from '@/components/molecules/multi-select'
import { Field, FieldError } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { fetchNextPage, useAdvancedFilterForm, useOptionsInfiniteQuery } from './lib'

// Component
const AdvancedFilterValueMultiSelectWithQueryField = ({
  index,
  selectedFilter
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()
  const { options, optionsInfiniteQuery, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    apiPath: selectedFilter.apiPath
  })

  // Template
  if (!selectedFilter.apiPath) {
    return null
  }

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <MultiSelect
              value={field.state.value as string[]}
              options={options}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              buttonTriggerProps={{
                isLoading: optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage
              }}
              commandProps={{
                shouldFilter: false
              }}
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
              commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
              onValueChange={field.handleChange}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueMultiSelectWithQueryField
