// import { Command as CommandPrimitive } from 'cmdk'
// import { Check, ChevronDown } from 'lucide-react'
// import { type KeyboardEvent, type ReactNode, useCallback, useState } from 'react'
// import {
//   Command,
//   CommandGroup,
//   CommandItem,
//   CommandList,
//   type CommandListProps,
//   type CommandProps
// } from '@/registry/new-york/atoms/command/components/command'
// import type { InputProps } from '@/registry/new-york/atoms/input/components/input'
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput
// } from '@/registry/new-york/atoms/input-group/components/input-group'
// import {
//   Popover,
//   PopoverAnchor,
//   PopoverContent,
//   PopoverTrigger
// } from '@/registry/new-york/atoms/popover/components/popover'
// import { Spinner } from '@/registry/new-york/atoms/spinner/components/spinner'
// import type { Option } from '@/types/base'
// import { cn } from '@/utils/ui'

// // Autocomplete
// export interface AutocompleteProps {
//   value: string
//   options: Option[]
//   placeholder?: string
//   isValueAsLabel?: boolean
//   isLoading?: boolean
//   commandProps?: CommandProps
//   inputProps?: InputProps
//   commandListProps?: CommandListProps
//   commandGroupSlot?: ReactNode
//   onValueChange: (value: string) => void
// }

// export const Autocomplete = ({
//   value,
//   options,
//   placeholder,
//   isValueAsLabel = true,
//   isLoading = false,
//   commandProps,
//   inputProps,
//   commandGroupSlot,
//   commandListProps,
//   onValueChange
// }: AutocompleteProps) => {
//   // States
//   const [isOpenPopover, setIsOpenPopover] = useState(false)

//   // Methods
//   const downKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Escape') {
//       close()
//     }
//   }, [])

//   const openAuto = useCallback((e: Event) => {
//     e.preventDefault()
//   }, [])

//   const interactOutside = useCallback((e: Event) => {
//     if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
//       e.preventDefault()
//     }
//   }, [])

//   // Template
//   return (
//     <div>
//       <Popover modal onOpenChange={setIsOpenPopover} open={isOpenPopover}>
//         <Command {...commandProps} className={cn('overflow-visible', commandProps?.className)}>
//           <PopoverAnchor>
//             <div>
//               <PopoverTrigger asChild onClick={() => setIsOpenPopover(true)}>
//                 <CommandPrimitive.Input asChild onKeyDown={downKey} onValueChange={onValueChange} value={value}>
//                   <InputGroup>
//                     <InputGroupInput
//                       onChange={({ target: { value } }) => onValueChange(value)}
//                       placeholder={placeholder}
//                       value={value}
//                       {...inputProps}
//                     />
//                     <InputGroupAddon align='inline-end'>{isLoading ? <Spinner /> : <ChevronDown />}</InputGroupAddon>
//                   </InputGroup>
//                 </CommandPrimitive.Input>
//               </PopoverTrigger>
//             </div>
//           </PopoverAnchor>

//           <PopoverContent
//             align='start'
//             className={cn(
//               'min-w-(--radix-popover-trigger-width) border-0 p-0 has-[[cmdk-group-items]:not(:empty)]:border',
//               {
//                 hidden: options.length === 0
//               }
//             )}
//             onInteractOutside={interactOutside}
//             onOpenAutoFocus={openAuto}
//           >
//             {isOpenPopover ? (
//               <CommandList {...commandListProps}>
//                 <CommandGroup>
//                   {options.map((option) => {
//                     const optionValue = isValueAsLabel ? option.label : option.value
//                     const isSelected = optionValue === value

//                     return (
//                       <CommandItem
//                         className='group/selected'
//                         key={option.value}
//                         onSelect={() => onValueChange(optionValue)}
//                         value={option.label}
//                       >
//                         {option.label}
//                         <Check className={cn('ml-auto size-4', isSelected ? 'visible' : 'invisible')} />
//                       </CommandItem>
//                     )
//                   })}

//                   {commandGroupSlot && commandGroupSlot}
//                 </CommandGroup>
//               </CommandList>
//             ) : null}
//           </PopoverContent>
//         </Command>
//       </Popover>
//     </div>
//   )
// }

export {}
