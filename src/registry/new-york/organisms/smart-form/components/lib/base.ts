import type { Option } from '@/types/base'

/**
 * Update reference of selected item bacause queryData will be changed after refetching
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
      // Update reference of selected item bacause of queryData will be changed after refetching
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
      // Update reference of selected item bacause of queryData will be changed after refetching
      queryData[valueIndex] = value
    }
  }

  return queryData
}
