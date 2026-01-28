import React from 'react'
import { MultiSelect, type MultiSelectProps } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import type { Option } from '@/types/base'

const options: Option[] = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

// Component
export const ComboboxDemo = () => {
  // States
  const [value, setValue] = React.useState<MultiSelectProps['value']>([])

  // Template
  return (
    <div className='w-full max-w-xs'>
      <MultiSelect onValueChange={setValue} options={options} placeholder='Select framework' value={value} />
    </div>
  )
}
