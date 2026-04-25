import { Combobox } from '@/components/atoms/combobox'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { useOptionsInfiniteQuery } from './lib/query'
import type { SelectFieldInputValue } from './lib/schema'

export default function SelectWithInfiniteQueryField({
  label,
  disabled,
  originalQueryPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsInfiniteQuery>[0]) {
  const field = useFieldContext<SelectFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const { options } = useOptionsInfiniteQuery({
    originalQueryPath,
    dependencyFieldsValue,
    selectedValue: field.state.value
  })

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Combobox
        items={options}
        // buttonTriggerProps={{
        //   id: `${field.form.formId}-${field.name}`,
        //   disabled,
        //   isLoading: optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage
        // }}
        // commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
        // commandInputProps={{
        //   value: searchKeyword,
        //   onValueChange: setSearchKeyword
        // }}
        // commandListProps={{
        //   onScroll: (event) =>
        //     fetchNextPage({
        //       event,
        //       infiniteQuery: optionsInfiniteQuery
        //     })
        // }}
        // commandProps={{
        //   shouldFilter: false
        // }}
        onValueChange={field.handleChange}
        // placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        value={field.state.value}
      />
    </FieldContainer>
  )
}
