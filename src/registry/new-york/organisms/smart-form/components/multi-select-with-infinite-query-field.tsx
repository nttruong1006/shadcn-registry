import type React from 'react'
import { MultiSelect } from '@/components/molecules/multi-select'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib'

// Component
const MultiSelectWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {(props) => <MultiSelectWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const MultiSelectWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  disabledFields
}: React.ComponentProps<FieldContainerProps['children']>) => {
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
      onValueChange={field.onChange}
    />
  )
}

export default MultiSelectWithInfiniteQueryField
