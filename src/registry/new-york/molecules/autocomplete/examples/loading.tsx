// import { useEffect, useState } from 'react'
// import { Button } from '@/registry/new-york/atoms/button/components/button'
// import {
//   Autocomplete,
//   type AutocompleteProps
// } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
// import type { Option } from '@/types/base'

// const allOptions: Option[] = [
//   {
//     value: 'next.js',
//     label: 'Next.js'
//   },
//   {
//     value: 'sveltekit',
//     label: 'SvelteKit'
//   },
//   {
//     value: 'nuxt.js',
//     label: 'Nuxt.js'
//   },
//   {
//     value: 'remix',
//     label: 'Remix'
//   },
//   {
//     value: 'astro',
//     label: 'Astro'
//   }
// ]

// // Component
// export const AutocompleteDemo = () => {
//   // States
//   const [value, setValue] = useState<AutocompleteProps['value']>('')
//   const [options, setOptions] = useState<AutocompleteProps['options']>([])
//   const [key, setKey] = useState(Date.now)

//   // Effects
//   // biome-ignore lint/correctness/useExhaustiveDependencies: to trigger effect when click toggle loading button
//   useEffect(() => {
//     setOptions([])
//     const timer = setTimeout(() => {
//       setOptions(allOptions)
//     }, 2000)
//     return () => clearTimeout(timer)
//   }, [key])

//   // Template
//   return (
//     <div className='w-full max-w-xs space-y-2'>
//       <Button onClick={() => setKey(Date.now)}>Toggle Loading</Button>
//       <Autocomplete
//         inputProps={{
//           placeholder: 'Select framework'
//         }}
//         isLoading={options.length === 0}
//         onValueChange={setValue}
//         options={options}
//         value={value}
//       />
//     </div>
//   )
// }
