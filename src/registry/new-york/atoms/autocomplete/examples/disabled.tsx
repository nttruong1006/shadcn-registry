import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

export default function AutocompleteDisabled() {
  return (
    <Autocomplete items={frameworks} openOnInputClick>
      <AutocompleteInput className='max-w-xs' disabled placeholder='Enter a framework' />
      <AutocompleteContent>
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
