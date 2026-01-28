import type { ComponentProps } from 'react'
import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'

// Component
const AutocompleteWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {(props) => <AutocompleteWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const AutocompleteWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  fieldState,
  disabledFields
}: ComponentProps<FieldContainerProps['children']>) => {
  // Hooks
  const { optionsInfiniteQuery, options } = useOptionsInfiniteQuery({
    fieldData,
    selectedValue: field.value,
    isLabelAsValue: true
  })

  // Template
  return (
    <Autocomplete
      {...field}
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
        'aria-invalid': fieldState.invalid
      }}
      isLoading={optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage}
      onValueChange={field.onChange}
      options={options}
      placeholder={`Enter ${fieldData.label.toLowerCase()}`}
    />
  )
}

export default AutocompleteWithInfiniteQueryField
