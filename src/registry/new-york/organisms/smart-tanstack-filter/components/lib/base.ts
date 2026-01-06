import { type DateArg, endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear } from 'date-fns'
import type { AdvancedFilterFormValueOutput, BasicSearchFormValueOutput } from './form'

// Smart filter logical operation
export enum SmartFilterLogicalOperation {
  And = ',',
  Or = '|'
}

// Smart filter operation
export enum SmartFilterOperation {
  EqualsTo = 'equalsTo',
  DoesNotEqualTo = 'doesNotEqualTo',
  Contains = 'contains',
  IsLessThan = 'isLessThan',
  IsLessThanOrEqualTo = 'isLessThanOrEqualTo',
  IsGreaterThan = 'isGreaterThan',
  IsGreaterThanOrEqualTo = 'isGreaterThanOrEqualTo',
  IsBetween = 'isBetween',
  HasAnyOf = 'hasAnyOf',
  HasAllOf = 'hasAllOf'
}

// Smart filter type
export enum SmartFilterType {
  Input = 'input',
  Number = 'number',
  Date = 'date',
  SelectWithOptions = 'select-with-options',
  SelectWithQuery = 'select-with-query',
  SelectWithInfiniteQuery = 'select-with-infinite-query',
  MultiSelectWithOptions = 'multi-select-with-options',
  MultiSelectWithQuery = 'multi-select-with-query',
  MultiSelectWithInfiniteQuery = 'multi-select-with-infinite-query'
}

// Smart filter api operation
export enum SmartFilterApiOperation {
  Equal = '==',
  NotEqual = '!=',
  LessThan = '<',
  GreaterThan = '>',
  LessThanOrEqual = '<=',
  GreaterThanOrEqual = '>=',
  Contain = '@=',
  StartWith = '_=',
  NotStartWith = '!_=',
  CaseInsensitiveStringContain = '@=*',
  CaseInsensitiveStringNotContain = '!@=*',
  CaseInsensitiveStartWith = '_=*',
  CaseInsensitiveNotStartWith = '!_=*',
  CaseInsensitiveEqual = '==*',
  CaseInsensitiveNotEqual = '!=*',
  EqualArray = '[]'
}

// Operation per type
export const operationsPerType: Record<SmartFilterType, SmartFilterOperation[]> = {
  [SmartFilterType.Input]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.Contains
  ],
  [SmartFilterType.Number]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.IsLessThan,
    SmartFilterOperation.IsLessThanOrEqualTo,
    SmartFilterOperation.IsGreaterThan,
    SmartFilterOperation.IsGreaterThanOrEqualTo,
    SmartFilterOperation.IsBetween
  ],
  [SmartFilterType.Date]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.IsLessThan,
    SmartFilterOperation.IsLessThanOrEqualTo,
    SmartFilterOperation.IsGreaterThan,
    SmartFilterOperation.IsGreaterThanOrEqualTo,
    SmartFilterOperation.IsBetween
  ],
  [SmartFilterType.SelectWithOptions]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.HasAnyOf
  ],
  [SmartFilterType.SelectWithQuery]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.HasAnyOf
  ],
  [SmartFilterType.SelectWithInfiniteQuery]: [
    SmartFilterOperation.EqualsTo,
    SmartFilterOperation.DoesNotEqualTo,
    SmartFilterOperation.HasAnyOf
  ],
  [SmartFilterType.MultiSelectWithOptions]: [SmartFilterOperation.HasAnyOf, SmartFilterOperation.HasAllOf],
  [SmartFilterType.MultiSelectWithQuery]: [SmartFilterOperation.HasAnyOf, SmartFilterOperation.HasAllOf],
  [SmartFilterType.MultiSelectWithInfiniteQuery]: [SmartFilterOperation.HasAnyOf, SmartFilterOperation.HasAllOf]
} as const

// Api operation per operation
export const apiOperationPerOperation: Partial<Record<SmartFilterOperation, SmartFilterApiOperation>> = {
  [SmartFilterOperation.EqualsTo]: SmartFilterApiOperation.Equal,
  [SmartFilterOperation.DoesNotEqualTo]: SmartFilterApiOperation.NotEqual,
  [SmartFilterOperation.IsLessThan]: SmartFilterApiOperation.LessThan,
  [SmartFilterOperation.IsLessThanOrEqualTo]: SmartFilterApiOperation.LessThanOrEqual,
  [SmartFilterOperation.IsGreaterThan]: SmartFilterApiOperation.GreaterThan,
  [SmartFilterOperation.IsGreaterThanOrEqualTo]: SmartFilterApiOperation.GreaterThanOrEqual,
  [SmartFilterOperation.Contains]: SmartFilterApiOperation.Contain
} as const

// Filter
export interface Filter {
  label: string
  name: string
  type: SmartFilterType
  options?: Array<{
    value: string
    label: string
  }>
  apiPath?: string
  dateFormat?: 'date' | 'month' | 'year'
}

// Transform form value to api filters param
const periodHandlerPerDateFormat: Record<
  NonNullable<Filter['dateFormat']>,
  {
    start: (date: DateArg<Date>) => Date
    end: (date: DateArg<Date>) => Date
  }
> = {
  date: { start: startOfDay, end: endOfDay },
  month: { start: startOfMonth, end: endOfMonth },
  year: { start: startOfYear, end: endOfYear }
}

export function transformFormValueToApiFiltersParam(
  value: BasicSearchFormValueOutput['keyword'] | AdvancedFilterFormValueOutput['filters'],
  filters: Filter[],
  handler?: {
    basicSearch?: string | ((value: BasicSearchFormValueOutput['keyword']) => string)
    advancedFilter?: (value: AdvancedFilterFormValueOutput['filters']) => string
  }
) {
  // Base filter
  if (typeof value === 'string') {
    if (value === '') {
      return undefined
    }

    if (typeof handler?.basicSearch === 'function') {
      return handler.basicSearch(value)
    }

    const baseFilterKey =
      handler?.basicSearch && typeof handler.basicSearch === 'string' ? handler.basicSearch : 'value'
    return `${baseFilterKey}${SmartFilterApiOperation.Contain}${value}`
  }

  // Advanced filter
  const filtersMap = filters.reduce<Record<string, Omit<Filter, 'name'>>>((acc, filter) => {
    acc[filter.name] = { ...filter }
    return acc
  }, {})

  return handler?.advancedFilter
    ? handler.advancedFilter(value)
    : value
        .map(({ name, operation, value }, index) => {
          const logicalOperation = index > 0 ? SmartFilterLogicalOperation.And : ''
          const { type, dateFormat = 'date' } = filtersMap[name]

          // Common
          // Has any of operation
          if (Array.isArray(value.default) && operation === SmartFilterOperation.HasAnyOf) {
            return `${logicalOperation}${name}${SmartFilterApiOperation.Equal}${value.default.join(SmartFilterLogicalOperation.Or)}`
          }

          // Has all of operation
          if (Array.isArray(value.default) && operation === SmartFilterOperation.HasAllOf) {
            return value.default
              .map((item) => `${logicalOperation}${name}${SmartFilterApiOperation.Equal}${item}`)
              .join(SmartFilterLogicalOperation.And)
          }

          switch (type) {
            case SmartFilterType.Number: {
              // Is between operation
              if (operation === SmartFilterOperation.IsBetween) {
                return `${logicalOperation}${name}${SmartFilterApiOperation.GreaterThanOrEqual}${value.additional.from}${SmartFilterLogicalOperation.And}${name}${SmartFilterApiOperation.LessThanOrEqual}${value.additional.to}`
              }
              break
            }

            case SmartFilterType.Date: {
              const dateValue = value.default as string

              // Equals operation
              if (operation === SmartFilterOperation.EqualsTo) {
                return `${logicalOperation}${name}${SmartFilterApiOperation.GreaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}${SmartFilterLogicalOperation.And}${name}${SmartFilterApiOperation.LessThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is less than operation
              if (operation === SmartFilterOperation.IsLessThan) {
                return `${logicalOperation}${name}${apiOperationPerOperation[operation]}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}`
              }

              // Is less than or equal to operation
              if (operation === SmartFilterOperation.IsLessThanOrEqualTo) {
                return `${logicalOperation}${name}${apiOperationPerOperation[operation]}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is greater than operation
              if (operation === SmartFilterOperation.IsGreaterThan) {
                return `${logicalOperation}${name}${apiOperationPerOperation[operation]}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is greater than or equal to operation
              if (operation === SmartFilterOperation.IsGreaterThanOrEqualTo) {
                return `${logicalOperation}${name}${apiOperationPerOperation[operation]}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}`
              }

              // Is between operation
              if (operation === SmartFilterOperation.IsBetween) {
                return `${logicalOperation}${name}${SmartFilterApiOperation.GreaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(value.additional.from).toISOString()}${SmartFilterLogicalOperation.And}${name}${SmartFilterApiOperation.LessThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(value.additional.to).toISOString()}`
              }

              break
            }

            default:
              break
          }

          // Normal filter
          return `${logicalOperation}${name}${apiOperationPerOperation[operation]}${value.default}`
        })
        .join('')
}
