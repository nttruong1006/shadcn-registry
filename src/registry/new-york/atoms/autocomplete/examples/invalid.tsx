import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList
} from '@/components/atoms/autocomplete'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

export default function AutocompleteInvalid() {
  return (
    <Autocomplete items={frameworks} openOnInputClick>
      <AutocompleteInput aria-invalid={true} className='max-w-xs' placeholder='Enter a framework' />
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
