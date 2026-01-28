import { useState } from 'react'
import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import type { Option } from '@/types/base'

// Constants
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
export function ComboboxLoading() {
  // States
  const [value, setValue] = useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        buttonTriggerProps={{ isLoading: true }}
        onValueChange={setValue}
        options={options}
        placeholder='Select framework'
        value={value}
      />
    </div>
  )
}
