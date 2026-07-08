import { type JSX, type LazyExoticComponent, lazy, useMemo } from 'react'
import type { Filter, SmartFilterType } from './lib/base'
import type { AdvancedFilterFormValueInput } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

export interface AdvancedFilterValueFieldProps {
  formFilterName: AdvancedFilterFormValueInput['filters'][number]['name']
  formFilterOperation: AdvancedFilterFormValueInput['filters'][number]['operation']
  formFilterValueAdditional: AdvancedFilterFormValueInput['filters'][number]['value']['additional']
  index: number
}

export type AdvancedFilterValueFieldComponentProps = AdvancedFilterValueFieldProps & {
  selectedFilter: Filter
}

const fieldComponents: {
  [key in SmartFilterType]: LazyExoticComponent<(props: AdvancedFilterValueFieldComponentProps) => JSX.Element | null>
} = {
  date: lazy(() => import('./advanced-filter-value-date-field')),
  input: lazy(() => import('./advanced-filter-value-input-field')),
  multiSelectWithInfiniteQuery: lazy(() => import('./advanced-filter-value-multi-select-with-infinite-query-field')),
  multiSelectWithOptions: lazy(() => import('./advanced-filter-value-multi-select-with-options-field')),
  multiSelectWithQuery: lazy(() => import('./advanced-filter-value-multi-select-with-query-field')),
  number: lazy(() => import('./advanced-filter-value-number-field')),
  selectWithInfiniteQuery: lazy(() => import('./advanced-filter-value-select-with-infinite-query-field')),
  selectWithOptions: lazy(() => import('./advanced-filter-value-select-with-options-field')),
  selectWithQuery: lazy(() => import('./advanced-filter-value-select-with-query-field'))
}

export default function AdvancedFilterValueField({
  formFilterName,
  formFilterOperation,
  ...props
}: AdvancedFilterValueFieldProps) {
  const { filters } = useSmartFilterContext()

  const selectedFilter = useMemo(
    () => filters.find((filter) => filter.name === formFilterName),
    [filters, formFilterName]
  )

  // Template
  if (!selectedFilter) {
    return null
  }

  const FieldComponent = fieldComponents[selectedFilter.type]
  return (
    <FieldComponent
      formFilterName={formFilterName}
      formFilterOperation={formFilterOperation}
      key={`${formFilterName}-${formFilterOperation}`}
      selectedFilter={selectedFilter}
      {...props}
    />
  )
}
