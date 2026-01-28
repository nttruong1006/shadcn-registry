import { MultiSelect, type MultiSelectProps } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const MultiSelectWithInfiniteQueryField = ({ fieldData, ...props }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <MultiSelectWithInfiniteQueryFieldContainer fieldData={fieldData} {...props} />
    </FieldContainer>
  )
}

const MultiSelectWithInfiniteQueryFieldContainer = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<MultiSelectProps['value']>()
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.state.value.length > 0 ? field.state.value.join(',') : null,
    isLabelAsValue: false
  })

  // Template
  return (
    <MultiSelect
      buttonTriggerProps={{
        id: fieldData.code,
        disabled: disabledFields?.[fieldData.code],
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
      placeholder={`Select ${fieldData.label.toLowerCase()}`}
      value={field.state.value}
    />
  )
}

export default MultiSelectWithInfiniteQueryField
