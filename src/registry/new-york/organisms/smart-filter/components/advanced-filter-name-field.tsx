import { useMemo } from 'react'
import { useSmartFilterContext } from '@/registry/new-york/organisms/smart-filter/components/smart-filter'
import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox.tsx'
import { type AdvancedFilterFormValueInput, useFieldContext } from './lib/form'

// Component
const AdvancedFilterNameField = ({ formFilters }: { formFilters: AdvancedFilterFormValueInput['filters'] }) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['name']>()

  // Memos
  const options = useMemo<ComboboxProps['options']>(() => {
    const selectedFilters = formFilters.map((field) => field.name)
    return filters
      .filter((filter) => filter.name === field.state.value || !selectedFilters.includes(filter.name))
      .map((filter) => ({
        value: filter.name,
        label: filter.label
      }))
  }, [filters, formFilters, field.state.value])

  // Template
  return (
    <Combobox
      isCanRemoveValue={false}
      onValueChange={(value) => field.handleChange(value as string)}
      options={options}
      value={field.state.value}
    />
  )
}

export default AdvancedFilterNameField
