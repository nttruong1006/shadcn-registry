import { useState } from 'react'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@/components/atoms/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import { Switch } from '@/components/atoms/switch'

const items = [
  { label: 'Select a fruit', value: null },
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' }
]

export function SelectAlignItem() {
  const [alignItemWithTrigger, setAlignItemWithTrigger] = useState(true)

  return (
    <FieldGroup className='w-full max-w-xs'>
      <Field orientation='horizontal'>
        <FieldContent>
          <FieldLabel htmlFor='align-item'>Align Item</FieldLabel>
          <FieldDescription>Toggle to align the item with the trigger.</FieldDescription>
        </FieldContent>
        <Switch checked={alignItemWithTrigger} id='align-item' onCheckedChange={setAlignItemWithTrigger} />
      </Field>
      <Field>
        <Select defaultValue='banana' items={items}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  )
}
