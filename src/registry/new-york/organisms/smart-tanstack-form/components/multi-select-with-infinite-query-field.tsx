import { MultiSelect, type MultiSelectProps } from '@/components/molecules/multi-select'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { fetchNextPage, useFieldContext, useOptionsInfiniteQuery } from './lib'

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
      value={field.state.value}
      options={options}
      placeholder={`Select ${fieldData.label.toLowerCase()}`}
      buttonTriggerProps={{
        id: fieldData.code,
        disabled: disabledFields?.[fieldData.code],
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
  )
}

export default MultiSelectWithInfiniteQueryField
