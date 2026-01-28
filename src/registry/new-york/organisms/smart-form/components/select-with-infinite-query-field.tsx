import type { ComponentProps } from 'react'
import { Combobox } from '@/registry/new-york/ui/combobox/components/combobox'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const SelectWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {(props) => <SelectWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const SelectWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  disabledFields
}: ComponentProps<FieldContainerProps['children']>) => {
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

export default SelectWithInfiniteQueryField
