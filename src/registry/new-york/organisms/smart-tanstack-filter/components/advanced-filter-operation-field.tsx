import React from 'react'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import {
  type AdvancedFilterFormValueInput,
  operationsPerType,
  type SmartFilterOperation,
  SmartFilterType,
  useFieldContext
} from './lib'
import { useSmartFilterContext } from './smart-filter'

const operationLabels: Record<string, Record<string, string | undefined> | undefined> = {
  base: {
    equalsTo: 'Equals to',
    doesNotEqualTo: 'Does not equal to',
    contains: 'Contains',
    isBetween: 'Is between',
    hasAnyOf: 'Has any of',
    hasAllOf: 'Has all of'
  },
  [SmartFilterType.Number]: {
    isLessThan: 'Is less than',
    isLessThanOrEqualTo: 'Is less than or equal to',
    isGreaterThan: 'Is greater than',
    isGreaterThanOrEqualTo: 'Is greater than or equal to'
  },
  [SmartFilterType.Date]: {
    isLessThan: 'Is before',
    isLessThanOrEqualTo: 'Is before or equal to',
    isGreaterThan: 'Is after',
    isGreaterThanOrEqualTo: 'Is after or equal to'
  }
}

// Component
const AdvancedFilterOperationField = ({ formFilterName }: { formFilterName: string }) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['operation']>()

  // Memos
  const options = React.useMemo<ComboboxProps['options']>(() => {
    const type = filters.find((filter) => filter.name === formFilterName)?.type
    return type
      ? operationsPerType[type].map((operation) => ({
          value: operation,
          label: operationLabels[type]?.[operation] ?? operationLabels.base?.[operation] ?? ''
        }))
      : []
  }, [filters, formFilterName])

  // Template
  return (
    <Combobox
      value={field.state.value}
      options={options}
      isCanRemoveValue={false}
      onValueChange={(value) => field.handleChange(value as SmartFilterOperation)}
    />
  )
}

export default AdvancedFilterOperationField
