import React from 'react'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import { type AdvancedFilterFormValueInput, useFieldContext } from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const AdvancedFilterNameField = ({ formFilters }: { formFilters: AdvancedFilterFormValueInput['filters'] }) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['name']>()

  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
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
      value={field.state.value}
      options={options}
      isCanRemoveValue={false}
      onValueChange={(value) => field.handleChange(value as string)}
    />
  )
}

export default AdvancedFilterNameField
