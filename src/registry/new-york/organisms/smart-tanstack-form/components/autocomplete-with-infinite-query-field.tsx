import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

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
      commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
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
      inputProps={{
        id: fieldData.code,
        disabled: disabledFields?.[fieldData.code],
        'aria-invalid': isInvalid
      }}
      isLoading={optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage}
      onValueChange={field.handleChange}
      options={options}
      placeholder={`Enter ${fieldData.label.toLowerCase()}`}
      value={field.state.value}
    />
  )
}

export default AutocompleteWithInfiniteQueryField
