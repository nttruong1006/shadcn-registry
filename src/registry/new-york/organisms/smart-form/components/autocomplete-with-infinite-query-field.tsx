// import { Spinner } from '@/registry/new-york/atoms/spinner/components/spinner'
// import { Autocomplete } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
// import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
// import { useFieldContext } from './lib/base'
// import { fetchNextPage, useOptionsInfiniteQuery } from './lib/query'
// import type { AutocompleteFieldInputValue } from './lib/schema'

// // Component
// const AutocompleteWithInfiniteQueryField = ({
//   label,
//   isDisabled,
//   originalApiPath,
//   dependencyFieldsValue,
//   selectedValue,
//   ...props
// }: BaseSmartFormFieldFieldProps & Parameters<typeof useOptionsInfiniteQuery>[0]) => {
//   // Hooks
//   const field = useFieldContext<AutocompleteFieldInputValue>()
//   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
//   const { optionsInfiniteQuery, options } = useOptionsInfiniteQuery({
//     originalApiPath,
//     dependencyFieldsValue,
//     selectedValue: field.state.value,
//     isLabelAsValue: true
//   })

//   // Template
//   return (
//     <FieldContainer errors={field.state.meta.errors} isInvalid={isInvalid} label={label} name={field.name} {...props}>
//       <Autocomplete
//         commandGroupSlot={optionsInfiniteQuery.isFetchingNextPage ? <Spinner className='mx-auto my-2' /> : null}
//         commandListProps={{
//           onScroll: (event) =>
//             fetchNextPage({
//               event,
//               infiniteQuery: optionsInfiniteQuery
//             })
//         }}
//         commandProps={{
//           shouldFilter: false
//         }}
//         inputProps={{
//           id: field.name,
//           disabled: isDisabled,
//           'aria-invalid': isInvalid
//         }}
//         isLoading={optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage}
//         onValueChange={field.handleChange}
//         options={options}
//         placeholder={typeof label === 'string' ? `Enter ${label.toLowerCase()}` : undefined}
//         value={field.state.value}
//       />
//     </FieldContainer>
//   )
// }

// export default AutocompleteWithInfiniteQueryField

export default () => null
