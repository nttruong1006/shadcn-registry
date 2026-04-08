import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'

const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const

export function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox autoHighlight defaultValue={[frameworks[0]]} items={frameworks} multiple>
      <ComboboxChips className='w-full max-w-xs' ref={anchor}>
        <ComboboxValue>
          {(values) => values.map((value: string) => <ComboboxChip key={value}>{value}</ComboboxChip>)}
        </ComboboxValue>
        <ComboboxChipsInput />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
