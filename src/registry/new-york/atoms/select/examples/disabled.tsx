import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'

export function SelectDisabled() {
  const items = [
    { label: 'Select a fruit', value: null },
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { disabled: true, label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' }
  ]
  return (
    <Select disabled items={items}>
      <SelectTrigger className='w-full max-w-48'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem disabled={item.disabled} key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
