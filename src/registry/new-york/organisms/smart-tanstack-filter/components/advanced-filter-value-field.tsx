import { type JSX, type LazyExoticComponent, lazy, useMemo } from 'react'
import { type Filter, SmartFilterType } from './lib/base'
import type { AdvancedFilterFormValueInput } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

export interface AdvancedFilterValueFieldProps {
  index: number
  formFilterName: AdvancedFilterFormValueInput['filters'][number]['name']
  formFilterOperation: AdvancedFilterFormValueInput['filters'][number]['operation']
  formFilterValueAdditional: AdvancedFilterFormValueInput['filters'][number]['value']['additional']
}

export type AdvancedFilterValueFieldComponentProps = AdvancedFilterValueFieldProps & { selectedFilter: Filter }

const fieldComponents: Record<
  SmartFilterType,
  LazyExoticComponent<(props: AdvancedFilterValueFieldComponentProps) => JSX.Element | null>
> = {
  [SmartFilterType.Input]: lazy(() => import('./advanced-filter-value-input-field')),
  [SmartFilterType.Number]: lazy(() => import('./advanced-filter-value-number-field')),
  [SmartFilterType.Date]: lazy(() => import('./advanced-filter-value-date-field')),
  [SmartFilterType.SelectWithOptions]: lazy(() => import('./advanced-filter-value-select-with-options-field')),
  [SmartFilterType.SelectWithQuery]: lazy(() => import('./advanced-filter-value-select-with-query-field')),
  [SmartFilterType.SelectWithInfiniteQuery]: lazy(
    () => import('./advanced-filter-value-select-with-infinite-query-field')
  ),
  [SmartFilterType.MultiSelectWithOptions]: lazy(
    () => import('./advanced-filter-value-multi-select-with-options-field')
  ),
  [SmartFilterType.MultiSelectWithQuery]: lazy(() => import('./advanced-filter-value-multi-select-with-query-field')),
  [SmartFilterType.MultiSelectWithInfiniteQuery]: lazy(
    () => import('./advanced-filter-value-multi-select-with-infinite-query-field')
  )
}

// Component
const AdvancedFilterValueField = ({ formFilterName, ...props }: AdvancedFilterValueFieldProps) => {
  // Hooks
  const { filters } = useSmartFilterContext()

  // Memos
  const selectedFilter = useMemo(() => {
    return filters.find((filter) => filter.name === formFilterName)
  }, [filters, formFilterName])

  // Template
  if (!selectedFilter) {
    return null
  }

  const FieldComponent = fieldComponents[selectedFilter.type]
  return <FieldComponent formFilterName={formFilterName} selectedFilter={selectedFilter} {...props} />
}

export default AdvancedFilterValueField
