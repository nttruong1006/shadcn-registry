import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const SelectWithInfiniteQueryField = ({ fieldData, ...props }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <SelectWithInfiniteQueryFieldContainer fieldData={fieldData} {...props} />
    </FieldContainer>
  )
}

const SelectWithInfiniteQueryFieldContainer = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<ComboboxProps['value']>()
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.state.value,
    isLabelAsValue: false
  })

  // Template
  return (
    <Combobox
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

export default SelectWithInfiniteQueryField
