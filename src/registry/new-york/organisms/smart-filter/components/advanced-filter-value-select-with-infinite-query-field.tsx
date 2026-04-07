import { Combobox } from '@/components/atoms/combobox'
import { Field, FieldError } from '@/components/atoms/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'
import { useOptionsInfiniteQuery } from './lib/query'

export default function AdvancedFilterValueSelectWithInfiniteQueryField({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()
  const {
    options
    // optionsInfiniteQuery, searchKeyword, setSearchKeyword
  } = useOptionsInfiniteQuery({
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
              {/* <MultiSelect
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
              /> */}
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
              items={options}
              // buttonTriggerProps={{
              //   isLoading: optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage
              // }}
              // commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
              // commandInputProps={{
              //   value: searchKeyword,
              //   onValueChange: setSearchKeyword
              // }}
              // commandListProps={{
              //   onScroll: (event) =>
              //     fetchNextPage({
              //       event,
              //       infiniteQuery: optionsInfiniteQuery
              //     })
              // }}
              // commandProps={{
              //   shouldFilter: false
              // }}
              onValueChange={(value) => {
                field.handleChange(value ?? '')
              }}
              // placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
