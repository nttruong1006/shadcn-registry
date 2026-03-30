import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'
import type { SelectFieldInputValue } from './lib/schema'

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
    <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
      <Combobox
        buttonTriggerProps={{
          id: field.name,
          disabled: isDisabled,
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
        onValueChange={field.handleChange as ComboboxProps['onValueChange']}
        options={options}
        placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default SelectWithInfiniteQueryField
