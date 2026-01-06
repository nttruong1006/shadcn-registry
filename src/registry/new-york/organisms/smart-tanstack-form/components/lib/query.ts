import {
  type DefaultError,
  type GetNextPageParamFunction,
  type InfiniteData,
  type QueryKey,
  type UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import React from 'react'
import { executeAxios } from '@/lib/axios'
import type { OptionsInfiniteQueryData, PaginationQueryData } from '@/types/api'
import type { Option } from '@/types/base'
import type { SmartFormFieldData } from './base'
import { useDependencyFields } from './dependency'

// Use options query
export const useOptionsQuery = ({ fieldData }: { fieldData: SmartFormFieldData }) => {
  // Hooks
  const { dependencyFieldCodes, dependencyFieldsValue } = useDependencyFields({ fieldData })

  // States
  const [apiPath, setApiPath] = React.useState(fieldData.config?.apiPath)
  const [isEnabled, setIsEnabled] = React.useState(!fieldData.config?.apiPath?.includes('/{'))

  // Queries
  const optionsQuery = useQuery<{
    responseData: {
      rows: Option[]
    }
  }>({
    queryKey: apiPath ? apiPath?.split('?') : [],
    queryFn: ({ signal }) => {
      return executeAxios({ url: apiPath, method: 'GET', signal })
    },
    enabled: isEnabled
  })

  // Effects
  React.useEffect(() => {
    if (!fieldData.config?.apiPath) {
      return
    }

    const newQueryPath = dependencyFieldCodes.reduce<string>((result, code) => {
      const value = dependencyFieldsValue[code]
      if (value == null) {
        return result
      }
      return result.replace(`{${code}}`, value)
    }, fieldData.config.apiPath)

    setApiPath(newQueryPath)
    setIsEnabled(!newQueryPath?.includes('/{'))
  }, [dependencyFieldCodes, dependencyFieldsValue, fieldData])

  // Memos
  const options = React.useMemo<Option[]>(() => {
    if (!isEnabled) {
      return []
    }
    return (
      optionsQuery.data?.responseData?.rows.map((option) => ({
        value: option.value,
        label: typeof option.label === 'string' ? option.label : JSON.stringify(option.label)
      })) ?? []
    )
  }, [isEnabled, optionsQuery.data])

  return {
    optionsQuery,
    options
  }
}

// Infinite query page size
export const infiniteQueryPageSize = 100

// Get next page param
export const getNextPageParam: GetNextPageParamFunction<number | undefined> = (queryFn, _, page) => {
  const {
    responseData: { count, pageSize }
  } = queryFn as unknown as PaginationQueryData
  const queryPage = page as unknown as number
  const totalPage = Math.ceil(count / pageSize)

  if (!totalPage || queryPage === totalPage) {
    return null
  }
  return queryPage + 1
}

// Fetch next page
export const fetchNextPage = (args: {
  event: React.UIEvent<HTMLDivElement, UIEvent>
  infiniteQuery: UseInfiniteQueryResult
}) => {
  // Args
  const { event, infiniteQuery } = args

  const { scrollTop, offsetHeight, scrollHeight } = event.target as HTMLDivElement
  if (
    scrollTop + offsetHeight >= scrollHeight - 32 * 20 &&
    !infiniteQuery.isFetchingNextPage &&
    infiniteQuery.hasNextPage
  ) {
    infiniteQuery.fetchNextPage()
  }
}

// Use options infinite query
export const useOptionsInfiniteQuery = ({
  fieldData,
  selectedValue,
  isLabelAsValue = false
}: {
  fieldData: SmartFormFieldData
  selectedValue: string | null | undefined // If value is array, separate by the "," character
  isLabelAsValue?: boolean
}) => {
  // Hooks
  const { dependencyFieldCodes, dependencyFieldsValue } = useDependencyFields({ fieldData })

  // States
  const [apiPath, setApiPath] = React.useState(fieldData.config?.apiPath)
  const [isEnabled, setIsEnabled] = React.useState(!fieldData.config?.apiPath?.includes('/{'))
  const [searchKeyword, setSearchKeyword] = React.useState('')

  // Debounced
  const debouncedSearchKeyword = useDebounce(isLabelAsValue ? selectedValue?.trim() : searchKeyword.trim(), 400)

  // Queries
  const optionsInfiniteQuery = useInfiniteQuery<
    OptionsInfiniteQueryData,
    DefaultError,
    InfiniteData<OptionsInfiniteQueryData>,
    QueryKey,
    number | undefined
  >({
    queryKey: apiPath ? [...apiPath.split('?'), debouncedSearchKeyword] : [debouncedSearchKeyword],
    queryFn: ({ signal, pageParam }) => {
      return executeAxios({
        url: isLabelAsValue
          ? `${apiPath}${apiPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`
          : `${apiPath}${apiPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${selectedValue ? `&preSelected=${selectedValue}` : ''}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
        method: 'GET',
        signal
      })
    },
    enabled: isEnabled,
    initialPageParam: 1,
    getNextPageParam
  })

  // Effects
  React.useEffect(() => {
    if (!fieldData.config?.apiPath) {
      return
    }

    const newQueryPath = dependencyFieldCodes.reduce<string>((result, code) => {
      const value = dependencyFieldsValue[code]
      if (value == null) {
        return result
      }
      return result.replace(`{${code}}`, value)
    }, fieldData.config.apiPath)

    setApiPath(newQueryPath)
    setIsEnabled(!newQueryPath?.includes('/{'))
  }, [dependencyFieldCodes, dependencyFieldsValue, fieldData])

  // Memos
  const options = React.useMemo<Option[]>(() => {
    if (!isEnabled) {
      return []
    }
    return optionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []
  }, [isEnabled, optionsInfiniteQuery.data])

  return {
    optionsInfiniteQuery,
    options,
    searchKeyword,
    setSearchKeyword
  }
}
