// import { format, isAfter, isBefore, max, min, set } from 'date-fns'
// import { Calendar, X } from 'lucide-react'
// import React from 'react'
// import { Button, type ButtonProps } from '@/registry/new-york/atoms/button/components/button'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious
// } from '@/registry/new-york/atoms/carousel/components/carousel'
// import {
//   Popover,
//   PopoverContent,
//   type PopoverContentProps,
//   type PopoverProps,
//   PopoverTrigger,
//   type PopoverTriggerProps
// } from '@/registry/new-york/atoms/popover/components/popover'
// import { YearPicker } from '@/registry/new-york/molecules/year-picker/components/year-picker'
// import type { Option } from '@/types/base'
// import { cn } from '@/utils/ui'

// export const options: Option[] = Array.from({ length: 12 }).map((_, index) => ({
//   value: index.toString(),
//   label: `${index + 1 < 10 ? '0' : ''}${index + 1}`
// }))

// export const today = new Date()

// // Month picker
// export interface MonthPickerProps {
//   value: Date | null | undefined
//   isCanRemoveValue?: boolean
//   placeholder?: string
//   minDate?: Date
//   maxDate?: Date
//   popoverProps?: PopoverProps
//   popoverTriggerProps?: PopoverTriggerProps
//   buttonTriggerProps?: ButtonProps
//   popoverContentProps?: PopoverContentProps
//   onValueChange: (value: MonthPickerProps['value']) => void
// }

// export const MonthPicker = ({
//   value,
//   isCanRemoveValue = true,
//   placeholder,
//   minDate,
//   maxDate,
//   popoverProps,
//   popoverTriggerProps,
//   buttonTriggerProps,
//   popoverContentProps,
//   onValueChange
// }: MonthPickerProps) => {
//   // Methods
//   const changeValue = (date: Date) => {
//     if (minDate && isBefore(date, minDate)) {
//       return onValueChange(minDate)
//     }
//     if (maxDate && isAfter(date, maxDate)) {
//       return onValueChange(maxDate)
//     }
//     onValueChange(date)
//   }

//   // Memos
//   const isEmpty = React.useMemo(() => {
//     return value == null
//   }, [value])

//   // Template
//   return (
//     <Popover {...popoverProps}>
//       <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
//         {popoverTriggerProps?.children ?? (
//           <Button
//             data-empty={isEmpty}
//             role='combobox'
//             variant='outline'
//             {...buttonTriggerProps}
//             className={cn(
//               'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
//               buttonTriggerProps?.className
//             )}
//           >
//             {buttonTriggerProps?.children ?? (
//               <>
//                 <span className='line-clamp-1 block text-ellipsis'>
//                   {value ? format(value, 'MM/yyyy') : placeholder}
//                 </span>

//                 {isCanRemoveValue && !isEmpty ? (
//                   <X
//                     className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       onValueChange(null)
//                     }}
//                   />
//                 ) : (
//                   <Calendar className='ml-auto size-4 shrink-0 text-muted-foreground' />
//                 )}
//               </>
//             )}
//           </Button>
//         )}
//       </PopoverTrigger>

//       <PopoverContent
//         {...popoverContentProps}
//         className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
//       >
//         <div className='space-y-4 p-4'>
//           <YearPicker
//             isCanRemoveValue={false}
//             onValueChange={(yearValue) => {
//               if (!yearValue) {
//                 return
//               }
//               changeValue(
//                 set(today, {
//                   date: 1,
//                   month: value ? value.getMonth() : 0,
//                   year: +yearValue
//                 })
//               )
//             }}
//             placeholder='Select year'
//             value={value?.getFullYear().toString()}
//           />

//           <div className='grid grid-cols-4 gap-y-2'>
//             {options.map((option) => (
//               <Button
//                 key={option.value}
//                 onClick={() => {
//                   changeValue(
//                     set(today, {
//                       date: 1,
//                       month: +option.value,
//                       year: value ? value.getFullYear() : today.getFullYear()
//                     })
//                   )
//                 }}
//                 variant={value && value?.getMonth().toString() === option.value ? 'default' : 'ghost'}
//               >
//                 {option.label}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

// // Month range picker
// export type MonthRangePickerProps = Pick<
//   MonthPickerProps,
//   'isCanRemoveValue' | 'placeholder' | 'minDate' | 'maxDate'
// > & {
//   value: { start: Date | null | undefined; end: Date | null | undefined } | null | undefined
//   popoverProps?: PopoverProps
//   popoverTriggerProps?: PopoverTriggerProps
//   buttonTriggerProps?: ButtonProps
//   popoverContentProps?: PopoverContentProps
//   onValueChange: (value: MonthRangePickerProps['value']) => void
// }

// export const MonthRangePicker = ({
//   value,
//   isCanRemoveValue = true,
//   placeholder,
//   minDate,
//   maxDate,
//   popoverProps,
//   popoverTriggerProps,
//   buttonTriggerProps,
//   popoverContentProps,
//   onValueChange
// }: MonthRangePickerProps) => {
//   // Methods
//   const changeStartValue = (date: Date) => {
//     if (minDate && isBefore(date, minDate)) {
//       return onValueChange({
//         start: minDate,
//         end: value?.end
//       })
//     }

//     if (maxDate && isAfter(date, maxDate)) {
//       return onValueChange({
//         start: maxDate,
//         end: value?.end
//       })
//     }

//     onValueChange({
//       start: date,
//       end: value?.end
//     })
//   }

//   const changeEndValue = (date: Date) => {
//     if (minDate && isBefore(date, minDate)) {
//       return onValueChange({
//         start: value?.start,
//         end: minDate
//       })
//     }

//     if (maxDate && isAfter(date, maxDate)) {
//       return onValueChange({
//         start: value?.start,
//         end: maxDate
//       })
//     }

//     onValueChange({
//       start: value?.start,
//       end: date
//     })
//   }

//   // Memos
//   const isEmpty = React.useMemo(() => {
//     return !(value?.start && value?.end)
//   }, [value])

//   // Template
//   return (
//     <Popover {...popoverProps}>
//       <PopoverTrigger {...popoverTriggerProps} asChild={popoverTriggerProps?.asChild ?? true}>
//         {popoverTriggerProps?.children ?? (
//           <Button
//             data-empty={isEmpty}
//             role='combobox'
//             variant='outline'
//             {...buttonTriggerProps}
//             className={cn(
//               'w-full justify-start font-normal data-[empty=true]:text-muted-foreground [&_svg]:pointer-events-auto',
//               buttonTriggerProps?.className
//             )}
//           >
//             {buttonTriggerProps?.children ?? (
//               <>
//                 <span className='line-clamp-1 text-ellipsis'>
//                   {value?.start && value?.end
//                     ? `${format(value.start, 'MM/yyyy')} - ${format(value.end, 'MM/yyyy')}`
//                     : placeholder}
//                 </span>

//                 {isCanRemoveValue && !isEmpty ? (
//                   <X
//                     className='ml-auto size-4 shrink-0 text-muted-foreground transition-transform hover:scale-125'
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       onValueChange(null)
//                     }}
//                   />
//                 ) : (
//                   <Calendar className='ml-auto size-4 shrink-0 text-muted-foreground' />
//                 )}
//               </>
//             )}
//           </Button>
//         )}
//       </PopoverTrigger>

//       <PopoverContent
//         {...popoverContentProps}
//         className={cn('min-w-(--radix-popover-trigger-width) p-0', popoverContentProps?.className)}
//       >
//         <Carousel className='w-full max-w-xs'>
//           <CarouselContent>
//             {/* Start month */}
//             <CarouselItem>
//               <div className='space-y-4 p-4'>
//                 <div className='text-center font-medium text-xl'>Start</div>

//                 <YearPicker
//                   isCanRemoveValue={false}
//                   onValueChange={(yearValue) => {
//                     if (!yearValue) {
//                       return
//                     }
//                     const date = set(today, {
//                       date: 1,
//                       month: value?.start ? value.start.getMonth() : 0,
//                       year: +yearValue
//                     })
//                     changeStartValue(value?.end ? min([date, value.end]) : date)
//                   }}
//                   placeholder='Select year'
//                   value={value?.start?.getFullYear().toString()}
//                 />

//                 <div className='grid grid-cols-4 gap-y-2'>
//                   {options.map((option) => (
//                     <Button
//                       key={option.value}
//                       onClick={() => {
//                         const date = set(today, {
//                           date: 1,
//                           month: +option.value,
//                           year: value?.start ? value.start.getFullYear() : today.getFullYear()
//                         })
//                         changeStartValue(value?.end ? min([date, value.end]) : date)
//                       }}
//                       variant={
//                         value?.start && value.start?.getMonth().toString() === option.value ? 'default' : 'ghost'
//                       }
//                     >
//                       {option.label}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </CarouselItem>

//             {/* End month */}
//             <CarouselItem>
//               <div className='space-y-4 p-4'>
//                 <div className='text-center font-medium text-xl'>End</div>

//                 <YearPicker
//                   isCanRemoveValue={false}
//                   onValueChange={(yearValue) => {
//                     if (!yearValue) {
//                       return
//                     }
//                     const date = set(today, {
//                       date: 1,
//                       month: value?.end ? value.end.getMonth() : 0,
//                       year: +yearValue
//                     })
//                     changeEndValue(value?.start ? max([value.start, date]) : date)
//                   }}
//                   placeholder='Select year'
//                   value={value?.end?.getFullYear().toString()}
//                 />

//                 <div className='grid grid-cols-4 gap-y-2'>
//                   {options.map((option) => (
//                     <Button
//                       key={option.value}
//                       onClick={() => {
//                         const date = set(today, {
//                           date: 1,
//                           month: +option.value,
//                           year: value?.end ? value.end.getFullYear() : today.getFullYear()
//                         })
//                         changeEndValue(value?.start ? max([value.start, date]) : date)
//                       }}
//                       variant={value?.end && value.end?.getMonth().toString() === option.value ? 'default' : 'ghost'}
//                     >
//                       {option.label}
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             </CarouselItem>
//           </CarouselContent>
//           <CarouselPrevious className='top-8 left-4 rounded-md' />
//           <CarouselNext className='top-8 right-4 rounded-md' />
//         </Carousel>
//       </PopoverContent>
//     </Popover>
//   )
// }

export {}
