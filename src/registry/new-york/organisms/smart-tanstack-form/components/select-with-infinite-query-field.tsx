import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { fetchNextPage, useFieldContext, useOptionsInfiniteQuery } from './lib'

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

export default SelectWithInfiniteQueryField
