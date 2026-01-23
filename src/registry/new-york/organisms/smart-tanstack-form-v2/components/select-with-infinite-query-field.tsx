import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { fetchNextPage, type SelectFieldInputValue, useFieldContext, useOptionsInfiniteQuery } from './lib'

// Component
const SelectWithInfiniteQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsInfiniteQuery>[0]) => {
  // Hooks
  const field = useFieldContext<SelectFieldInputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsInfiniteQuery, options, searchKeyword, setSearchKeyword } = useOptionsInfiniteQuery({
    originalApiPath,
    dependencyFieldsValue,
    selectedValue: field.state.value
  })

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Combobox
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
        onValueChange={field.handleChange as ComboboxProps['onValueChange']}
      />
    </FieldContainer>
  )
}

export default SelectWithInfiniteQueryField
