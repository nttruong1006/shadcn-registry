import type { FieldProps } from '@/components/atoms/field'
import type { Option } from '@/types/base'

/**
 * @summary Update selected item reference because queryData will be changed after refetching
 */

export function updateSelectedItemReferencesAndGetItems({
  value,
  queryData
}: {
  value: Option | Option[] | null
  queryData: Option[]
}): Option[] {
  // Multiple
  if (Array.isArray(value)) {
    if (value.length > 0) {
      queryData.forEach((item, index) => {
        const valueIndex = value.findIndex((valueItem) => valueItem.value === item.value)
        if (valueIndex >= 0) {
          queryData[index] = value[valueIndex]
        }
      })
    }

    return queryData
  }

  // Single
  if (value) {
    const valueIndex = queryData.findIndex((item) => item.value === value.value)
    if (valueIndex >= 0) {
      queryData[valueIndex] = value
    }
  }

  return queryData
}

/**
 * @summary Base smart form field component props type
 */

export type BaseSmartFormFieldComponentProps = FieldProps & {
  required?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}
