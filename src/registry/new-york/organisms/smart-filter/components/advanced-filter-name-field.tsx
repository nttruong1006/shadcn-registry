import { useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
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
        label: filter.label,
        value: filter.name
      }))
  }, [filters, formFilters, field.state.value])

  return (
    <Select items={options} onValueChange={(value) => field.handleChange(value as string)} value={field.state.value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
