import type React from 'react'
import { Autocomplete } from '@/components/molecules/autocomplete'
import { Spinner } from '@/components/ui/spinner'
import FieldContainer, { type FieldContainerProps, type FieldProps } from './field-container'
import { fetchNextPage, useOptionsInfiniteQuery } from './lib'

// Component
const AutocompleteWithInfiniteQueryField = ({ fieldData, disabledFields }: FieldProps) => {
  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {(props) => <AutocompleteWithInfiniteQueryFieldContainer {...props} />}
    </FieldContainer>
  )
}

const AutocompleteWithInfiniteQueryFieldContainer = ({
  field,
  fieldData,
  fieldState,
  disabledFields
}: React.ComponentProps<FieldContainerProps['children']>) => {
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
      options={options}
      placeholder={`Enter ${fieldData.label.toLowerCase()}`}
      inputProps={{
        id: fieldData.code,
        disabled: disabledFields?.[fieldData.code],
        'aria-invalid': fieldState.invalid
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
      onValueChange={field.onChange}
    />
  )
}

export default AutocompleteWithInfiniteQueryField
