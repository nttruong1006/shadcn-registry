import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'
import type { MultiSelectFieldOutputValue } from './lib/schema'

// Component
const MultiSelectWithInfiniteQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsInfiniteQuery>[0]) => {
  // Hooks
  const field = useFieldContext<MultiSelectFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    originalApiPath,
    dependencyFieldsValue,
    selectedValue: field.state.value.length > 0 ? field.state.value.join(',') : null
  })

  // Template
  return (
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <MultiSelect
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled,
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
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default MultiSelectWithInfiniteQueryField
