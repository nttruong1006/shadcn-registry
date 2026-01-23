import { MultiSelect } from '@/components/molecules/multi-select'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { fetchNextPage, type MultiSelectFieldOutputValue, useFieldContext, useOptionsInfiniteQuery } from './lib'

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
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <MultiSelect
        value={field.state.value}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled,
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
    </FieldContainer>
  )
}

export default MultiSelectWithInfiniteQueryField
