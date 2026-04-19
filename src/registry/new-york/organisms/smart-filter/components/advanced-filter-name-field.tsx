import { useMemo } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/atoms/combobox'
import type { Option } from '@/types/base'
import { type AdvancedFilterFormValueInput, useFieldContext } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

export default function AdvancedFilterNameField({
  formFilters
}: {
  formFilters: AdvancedFilterFormValueInput['filters']
}) {
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['name']>()

  const options = useMemo<Option<string>[]>(() => {
    const selectedFilters = formFilters.map((field) => field.name)
    return filters
      .filter((filter) => filter.name === field.state.value || !selectedFilters.includes(filter.name))
      .map((filter) => ({
        value: filter.name,
        label: filter.label
      }))
  }, [filters, formFilters, field.state.value])

  return (
    <Combobox items={options} onValueChange={(value) => field.handleChange(value as string)} value={field.state.value}>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: Option<string>) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
