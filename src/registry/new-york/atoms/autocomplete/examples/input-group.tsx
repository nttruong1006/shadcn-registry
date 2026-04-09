import { GlobeIcon } from 'lucide-react'
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'
import { InputGroupAddon } from '@/components/atoms/input-group'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

export default function AutocompleteInputGroup() {
  return (
    <Autocomplete items={frameworks} openOnInputClick>
      <AutocompleteInput className='max-w-xs' placeholder='Enter a framework'>
        <InputGroupAddon>
          <GlobeIcon />
        </InputGroupAddon>
      </AutocompleteInput>
      <AutocompleteContent alignOffset={-28}>
        <AutocompleteList>
          {(item) => (
            <AutocompleteItem key={item} value={item}>
              {item}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
