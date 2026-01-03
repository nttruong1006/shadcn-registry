import { Autocomplete } from '@/components/molecules/autocomplete'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { fetchNextPage, useFieldContext, useOptionsInfiniteQuery } from './lib'

// Component
const AutocompleteWithInfiniteQueryField = ({ fieldData, ...props }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <AutocompleteWithInfiniteQueryFieldContainer fieldData={fieldData} {...props} />
    </FieldContainer>
  )
}

const AutocompleteWithInfiniteQueryFieldContainer = ({ fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const field = useFieldContext<string>()

  const { optionsInfiniteQuery, options } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.state.value,
    isLabelAsValue: true
  })

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <Autocomplete
      value={field.state.value}
      options={options}
      placeholder={`Enter ${fieldData.label.toLowerCase()}`}
      inputProps={{
        id: fieldData.code,
        disabled: disabledFields?.[fieldData.code],
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
  )
}

export default AutocompleteWithInfiniteQueryField
