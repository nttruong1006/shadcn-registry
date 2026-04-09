import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteSeparator
} from '@/components/atoms/autocomplete'

interface ProduceGroupItem {
  value: string
  items: string[]
}

const groups: ProduceGroupItem[] = [
  {
    value: 'Fruits',
    items: ['Apple', 'Banana', 'Orange']
  },
  {
    value: 'Vegetables',
    items: ['Carrot', 'Lettuce', 'Spinach']
  }
]

export default function AutocompleteGroups() {
  return (
    <Autocomplete items={groups} openOnInputClick>
      <AutocompleteInput className='max-w-xs' placeholder='Enter a fruit or vegetable' />
      <AutocompleteContent>
        <AutocompleteList>
          {(group) => (
            <AutocompleteGroup className='group/autocomplete-group' items={group.items} key={group.value}>
              <AutocompleteLabel>{group.value}</AutocompleteLabel>
              <AutocompleteCollection>
                {(item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
              <AutocompleteSeparator className='group-last/autocomplete-group:hidden' />
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  )
}
