import type React from 'react'
import { Combobox } from '@/components/ui/combobox'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib'

// Component
const SelectWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {(props) => <SelectWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const SelectWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  disabledFields
}: React.ComponentProps<FieldContainerProps['children']>) => {
  // Hooks
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.value,
    isLabelAsValue: false
  })

  // Template
  return (
    <Combobox
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

export default SelectWithInfiniteQueryField
