import { useMemo } from 'react'
import { Combobox } from '@/components/atoms/combobox'
import { type AdvancedFilterFormValueInput, useFieldContext } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

export default function AdvancedFilterNameField({
  formFilters
}: {
  formFilters: AdvancedFilterFormValueInput['filters']
}) {
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['name']>()

  const options = useMemo(() => {
    const selectedFilters = formFilters.map((field) => field.name)
    return filters
      .filter((filter) => filter.name === field.state.value || !selectedFilters.includes(filter.name))
      .map((filter) => ({
        value: filter.name,
        label: filter.label
      }))
  }, [filters, formFilters, field.state.value])

  return (
    <Combobox
      items={options}
      onValueChange={(value) => field.handleChange(value as string)}
      value={field.state.value}
    />
  )
}
