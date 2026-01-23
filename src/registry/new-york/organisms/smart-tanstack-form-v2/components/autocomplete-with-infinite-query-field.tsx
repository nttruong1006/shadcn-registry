import { Autocomplete } from '@/components/molecules/autocomplete'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { type AutocompleteFieldOutputValue, fetchNextPage, useFieldContext, useOptionsInfiniteQuery } from './lib'

// Component
const AutocompleteWithInfiniteQueryField = ({
  label,
  isDisabled,
  originalApiPath,
  dependencyFieldsValue,
  selectedValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsInfiniteQuery>[0]) => {
  // Hooks
  const field = useFieldContext<AutocompleteFieldOutputValue>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { optionsInfiniteQuery, options } = useOptionsInfiniteQuery({
    originalApiPath,
    dependencyFieldsValue,
    selectedValue: field.state.value,
    isLabelAsValue: true
  })

  // Template
  return (
    <FieldContainer label={label} name={field.name} isInvalid={isInvalid} errors={field.state.meta.errors} {...props}>
      <Autocomplete
        value={field.state.value}
        options={options}
        placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
        inputProps={{
          id: field.name,
          disabled: isDisabled,
          'aria-invalid': isInvalid
        }}
        isLoading={optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage}
        commandProps={{
          shouldFilter: false
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
    </FieldContainer>
  )
}

export default AutocompleteWithInfiniteQueryField
