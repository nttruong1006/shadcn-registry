// import { useState } from 'react'
// import {
//   Autocomplete,
//   type AutocompleteProps
// } from '@/registry/new-york/molecules/autocomplete/components/autocomplete'
// import type { Option } from '@/types/base'

// const options: Option[] = [
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

//   // Template
//   return (
//     <div className='w-full max-w-xs'>
//       <Autocomplete
//         inputProps={{
//           placeholder: 'Select framework'
//         }}
//         onValueChange={setValue}
//         options={options}
//         value={value}
//       />
//     </div>
//   )
// }
