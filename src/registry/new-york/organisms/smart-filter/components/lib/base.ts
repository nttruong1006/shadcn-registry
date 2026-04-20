import { type DateArg, endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear } from 'date-fns'
import type { Option } from '@/types/base'
import type { AdvancedFilterFormValueOutput, BasicSearchFormValueOutput } from './form'

// Smart filter operation
export const smartFilterOperations = [
  'equalsTo',
  'doesNotEqualTo',
  'contains',
  'isLessThan',
  'isLessThanOrEqualTo',
  'isGreaterThan',
  'isGreaterThanOrEqualTo',
  'isBetween',
  'hasAnyOf',
  'hasAllOf'
] as const

export type SmartFilterOperation = (typeof smartFilterOperations)[number]

// Smart filter type
export const smartFilterTypes = [
  'input',
  'number',
  'date',
  'selectWithOptions',
  'selectWithQuery',
  'selectWithInfiniteQuery',
  'multiSelectWithOptions',
  'multiSelectWithQuery',
  'multiSelectWithInfiniteQuery'
] as const

export type SmartFilterType = (typeof smartFilterTypes)[number]

// Smart filter api operation
export const smartFilterApiOperations = {
  equal: '==',
  notEqual: '!=',
  lessThan: '<',
  greaterThan: '>',
  lessThanOrEqual: '<=',
  greaterThanOrEqual: '>=',
  contain: '@=',
  startWith: '_=',
  notStartWith: '!_=',
  caseInsensitiveStringContain: '@=*',
  caseInsensitiveStringNotContain: '!@=*',
  caseInsensitiveStartWith: '_=*',
  caseInsensitiveNotStartWith: '!_=*',
  caseInsensitiveEqual: '==*',
  caseInsensitiveNotEqual: '!=*',
  equalArray: '[]'
} as const

export type SmartFilterApiOperation = (typeof smartFilterApiOperations)[keyof typeof smartFilterApiOperations]

// Smart filter logical operation
export const smartFilterLogicalOperation = {
  and: ',',
  or: '|'
} as const

// Operation per type
export const operationsPerType: Record<SmartFilterType, SmartFilterOperation[]> = {
  input: ['equalsTo', 'doesNotEqualTo', 'contains'],
  number: [
    'equalsTo',
    'doesNotEqualTo',
    'isLessThan',
    'isLessThanOrEqualTo',
    'isGreaterThan',
    'isGreaterThanOrEqualTo',
    'isBetween'
  ],
  date: ['equalsTo', 'isLessThan', 'isLessThanOrEqualTo', 'isGreaterThan', 'isGreaterThanOrEqualTo', 'isBetween'],
  selectWithOptions: ['equalsTo', 'doesNotEqualTo', 'hasAnyOf'],
  selectWithQuery: ['equalsTo', 'doesNotEqualTo', 'hasAnyOf'],
  selectWithInfiniteQuery: ['equalsTo', 'doesNotEqualTo', 'hasAnyOf'],
  multiSelectWithOptions: ['hasAnyOf', 'hasAllOf'],
  multiSelectWithQuery: ['hasAnyOf', 'hasAllOf'],
  multiSelectWithInfiniteQuery: ['hasAnyOf', 'hasAllOf']
} as const

// Api operation per operation
export const apiOperationPerOperation: Partial<Record<SmartFilterOperation, SmartFilterApiOperation>> = {
  equalsTo: '==',
  doesNotEqualTo: '!=',
  isLessThan: '<',
  isLessThanOrEqualTo: '<=',
  isGreaterThan: '>',
  isGreaterThanOrEqualTo: '>=',
  contains: '@='
} as const

// Filter
const filterTypesWithOptions = ['selectWithOptions', 'multiSelectWithOptions'] as const
type FilterTypeWithOptions = (typeof filterTypesWithOptions)[number]

const filterTypesWithQuery = [
  'selectWithQuery',
  'selectWithInfiniteQuery',
  'multiSelectWithQuery',
  'multiSelectWithInfiniteQuery'
] as const
type FilterTypeWithQuery = (typeof filterTypesWithQuery)[number]

type OtherFilterType = Exclude<SmartFilterType, FilterTypeWithOptions | FilterTypeWithQuery>

export interface BaseFilter {
  label: string
  name: string
  dateFormat?: 'date' | 'month' | 'year'
}

export interface FilterWithOptions extends BaseFilter {
  type: FilterTypeWithOptions
  options: Option<string>[]
}

export interface FilterWithQuery extends BaseFilter {
  type: FilterTypeWithQuery
  apiPath: string
}

interface OtherFilter extends BaseFilter {
  type: OtherFilterType
}

export type Filter = FilterWithOptions | FilterWithQuery | OtherFilter

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
    return `${baseFilterKey}${apiOperationPerOperation.contains}${value}`
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
          const logicalOperation = index > 0 ? smartFilterLogicalOperation.and : ''
          const { type, dateFormat = 'date' } = filtersMap[name]

          // Common
          // Has any of operation
          if (Array.isArray(value.default) && operation === 'hasAnyOf') {
            return `${logicalOperation}${name}${smartFilterApiOperations.equal}${value.default.join(smartFilterLogicalOperation.or)}`
          }

          // Has all of operation
          if (Array.isArray(value.default) && operation === 'hasAllOf') {
            return value.default
              .map((item) => `${logicalOperation}${name}${smartFilterApiOperations.equal}${item}`)
              .join(smartFilterLogicalOperation.and)
          }

          switch (type) {
            case 'number': {
              // Is between operation
              if (operation === 'isBetween') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${value.additional.from}${smartFilterLogicalOperation.and}${name}${smartFilterApiOperations.lessThanOrEqual}${value.additional.to}`
              }
              break
            }

            case 'date': {
              const dateValue = value.default as string

              // Equals operation
              if (operation === 'equalsTo') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}${smartFilterLogicalOperation.and}${name}${smartFilterApiOperations.lessThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is less than operation
              if (operation === 'isLessThan') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}`
              }

              // Is less than or equal to operation
              if (operation === 'isLessThanOrEqualTo') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is greater than operation
              if (operation === 'isGreaterThan') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(dateValue).toISOString()}`
              }

              // Is greater than or equal to operation
              if (operation === 'isGreaterThanOrEqualTo') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(dateValue).toISOString()}`
              }

              // Is between operation
              if (operation === 'isBetween') {
                return `${logicalOperation}${name}${smartFilterApiOperations.greaterThanOrEqual}${periodHandlerPerDateFormat[dateFormat].start(value.additional.from).toISOString()}${smartFilterLogicalOperation.and}${name}${smartFilterApiOperations.lessThanOrEqual}${periodHandlerPerDateFormat[dateFormat].end(value.additional.to).toISOString()}`
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
