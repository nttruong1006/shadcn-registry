import React from 'react'
import { type AdvancedFilterFormValueInput, type Filter, SmartFilterType } from './lib'
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
  React.LazyExoticComponent<(props: AdvancedFilterValueFieldComponentProps) => React.JSX.Element | null>
> = {
  [SmartFilterType.Input]: React.lazy(() => import('./advanced-filter-value-input-field')),
  [SmartFilterType.Number]: React.lazy(() => import('./advanced-filter-value-number-field')),
  [SmartFilterType.Date]: React.lazy(() => import('./advanced-filter-value-date-field')),
  [SmartFilterType.SelectWithOptions]: React.lazy(() => import('./advanced-filter-value-select-with-options-field')),
  [SmartFilterType.SelectWithQuery]: React.lazy(() => import('./advanced-filter-value-select-with-query-field')),
  [SmartFilterType.SelectWithInfiniteQuery]: React.lazy(
    () => import('./advanced-filter-value-select-with-infinite-query-field')
  ),
  [SmartFilterType.MultiSelectWithOptions]: React.lazy(
    () => import('./advanced-filter-value-multi-select-with-options-field')
  ),
  [SmartFilterType.MultiSelectWithQuery]: React.lazy(
    () => import('./advanced-filter-value-multi-select-with-query-field')
  ),
  [SmartFilterType.MultiSelectWithInfiniteQuery]: React.lazy(
    () => import('./advanced-filter-value-multi-select-with-infinite-query-field')
  )
}

// Component
const AdvancedFilterValueField = ({ formFilterName, ...props }: AdvancedFilterValueFieldProps) => {
  // Hooks
  const { filters } = useSmartFilterContext()

  // Memos
  const selectedFilter = React.useMemo(() => {
    return filters.find((filter) => filter.name === formFilterName)
  }, [filters, formFilterName])

  // Template
  if (!selectedFilter) {
    return null
  }

  const FieldComponent = fieldComponents[selectedFilter.type]
  return <FieldComponent selectedFilter={selectedFilter} formFilterName={formFilterName} {...props} />
}

export default AdvancedFilterValueField
