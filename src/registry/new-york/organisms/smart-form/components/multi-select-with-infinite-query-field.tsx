import type { ComponentProps } from 'react'
import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const MultiSelectWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {(props) => <MultiSelectWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const MultiSelectWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  disabledFields
}: ComponentProps<FieldContainerProps['children']>) => {
  // Hooks
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.value.length > 0 ? field.value.join(',') : [],
    isLabelAsValue: false
  })

  // Template
  return (
    <MultiSelect
      {...field}
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
      onValueChange={field.onChange}
      options={options}
      placeholder={`Select ${fieldData.label.toLowerCase()}`}
    />
  )
}

export default MultiSelectWithInfiniteQueryField
