import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

export default function AutocompleteClearButton() {
  return (
    <Autocomplete items={frameworks} openOnInputClick>
      <AutocompleteInput className='max-w-xs' placeholder='Enter a framework' showClear />
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
