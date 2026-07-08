import { useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/select'
import type { Option } from '@/types/base'
import { operationsPerType, type SmartFilterOperation } from './lib/base'
import { type AdvancedFilterFormValueInput, useFieldContext } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

const operationLabels: Record<string, Record<string, string | undefined> | undefined> = {
  base: {
    contains: 'Contains',
    doesNotEqualTo: 'Does not equal to',
    equalsTo: 'Equals to',
    hasAllOf: 'Has all of',
    hasAnyOf: 'Has any of',
    isBetween: 'Is between'
  },
  date: {
    isGreaterThan: 'Is after',
    isGreaterThanOrEqualTo: 'Is after or equal to',
    isLessThan: 'Is before',
    isLessThanOrEqualTo: 'Is before or equal to'
  },
  number: {
    isGreaterThan: 'Is greater than',
    isGreaterThanOrEqualTo: 'Is greater than or equal to',
    isLessThan: 'Is less than',
    isLessThanOrEqualTo: 'Is less than or equal to'
  }
}

export default function AdvancedFilterOperationField({ formFilterName }: { formFilterName: string }) {
  const { filters } = useSmartFilterContext()
  const field = useFieldContext<AdvancedFilterFormValueInput['filters'][number]['operation']>()

  const options = useMemo<Option<SmartFilterOperation>[]>(() => {
    const type = filters.find((filter) => filter.name === formFilterName)?.type
    return type
      ? operationsPerType[type].map((operation) => ({
          label: operationLabels[type]?.[operation] ?? operationLabels.base?.[operation] ?? '',
          value: operation
        }))
      : []
  }, [filters, formFilterName])

  return (
    <Select
      items={options}
      onValueChange={(value) => {
        if (value) {
          field.handleChange(value)
        }
      }}
      value={field.state.value}
    >
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
