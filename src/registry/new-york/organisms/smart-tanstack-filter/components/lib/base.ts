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
  datePickerFormat?: 'date' | 'month' | 'year'
}
