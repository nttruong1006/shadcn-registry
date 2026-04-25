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
import { type UIEvent, useEffect, useMemo, useState } from 'react'
import { executeAxios } from '@/lib/axios'
import type { OptionsInfiniteQueryData, PaginationQueryData } from '@/types/api'
import type { Option } from '@/types/base'

// Use get options query
export const useGetOptionsQuery = ({
  originalApiPath,
  dependencyFieldsValue
}: {
  originalApiPath: string
  dependencyFieldsValue?: Record<string, unknown>
}) => {
  const [apiPath, setApiPath] = useState(originalApiPath)
  const [enabled, setEnabled] = useState(!originalApiPath?.includes('/{'))

  const getOptionsQuery = useQuery<{
    responseData: {
      rows: Option[]
    }
  }>({
    queryKey: apiPath.split('?'),
    queryFn: ({ signal }) => {
      return executeAxios({ url: apiPath, method: 'GET', signal })
    },
    enabled
  })

  useEffect(() => {
    if (!dependencyFieldsValue) {
      return
    }

    const newApiPath = Object.keys(dependencyFieldsValue).reduce<string>((result, fieldName) => {
      const value = dependencyFieldsValue[fieldName]
      if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
        return result
      }
      return result.replace(`{${fieldName}}`, value.toString())
    }, originalApiPath)

    setApiPath(newApiPath)
    setEnabled(!newApiPath?.includes('/{'))
  }, [dependencyFieldsValue, originalApiPath])

  const options = useMemo<Option[]>(() => {
    if (!enabled) {
      return []
    }
    return (
      getOptionsQuery.data?.responseData?.rows.map((option) => ({
        value: option.value,
        label: typeof option.label === 'string' ? option.label : JSON.stringify(option.label)
      })) ?? []
    )
  }, [enabled, getOptionsQuery.data])

  return {
    getOptionsQuery,
    options
  }
}

// Infinite query page size
export const infiniteQueryPageSize = 100

// Get next page param
export const getNextPageParam: GetNextPageParamFunction<number, PaginationQueryData> = (queryFn, _, page) => {
  const {
    responseData: { count, pageSize }
  } = queryFn
  const queryPage = page as unknown as number
  const totalPage = Math.ceil(count / pageSize)

  if (!totalPage || queryPage === totalPage) {
    return null
  }
  return queryPage + 1
}

// Fetch next page
export function fetchNextPage({
  event,
  infiniteQuery
}: {
  event: UIEvent<HTMLDivElement>
  infiniteQuery: UseInfiniteQueryResult
}) {
  const { scrollTop, offsetHeight, scrollHeight } = event.target as HTMLDivElement
  if (
    scrollTop + offsetHeight >= scrollHeight - 28 * 20 &&
    !infiniteQuery.isFetchingNextPage &&
    infiniteQuery.hasNextPage
  ) {
    infiniteQuery.fetchNextPage()
  }
}

// Use get options infinite query
export function useGetOptionsInfiniteQuery({
  originalApiPath,
  dependencyFieldsValue,
  selectedValue,
  valueAsLabel = false
}: {
  originalApiPath: string
  selectedValue: string | null | undefined // If value is array, separate by the "," character
  dependencyFieldsValue?: Record<string, unknown>
  valueAsLabel?: boolean
}) {
  const [apiPath, setApiPath] = useState(originalApiPath)
  const [enabled, setEnabled] = useState(!originalApiPath?.includes('/{'))
  const [searchKeyword, setSearchKeyword] = useState('')

  const debouncedSearchKeyword = useDebounce(valueAsLabel ? selectedValue?.trim() : searchKeyword.trim(), 400)

  const getOptionsInfiniteQuery = useInfiniteQuery<
    OptionsInfiniteQueryData,
    DefaultError,
    InfiniteData<OptionsInfiniteQueryData>,
    QueryKey,
    number
  >({
    queryKey: [...apiPath.split('?'), debouncedSearchKeyword],
    queryFn: ({ signal, pageParam }) => {
      return executeAxios({
        url: valueAsLabel
          ? `${apiPath}${apiPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`
          : `${apiPath}${apiPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${selectedValue ? `&preSelected=${selectedValue}` : ''}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
        method: 'GET',
        signal
      })
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam
  })

  useEffect(() => {
    if (!dependencyFieldsValue) {
      return
    }

    const newApiPath = Object.keys(dependencyFieldsValue).reduce<string>((result, fieldName) => {
      const value = dependencyFieldsValue[fieldName]
      if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
        return result
      }
      return result.replace(`{${fieldName}}`, value.toString())
    }, apiPath)

    setApiPath(newApiPath)
    setEnabled(!newApiPath?.includes('/{'))
  }, [dependencyFieldsValue, apiPath])

  const options = useMemo<Option[]>(() => {
    if (!enabled) {
      return []
    }
    return getOptionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []
  }, [enabled, getOptionsInfiniteQuery.data])

  return {
    getOptionsInfiniteQuery,
    options,
    searchKeyword,
    debouncedSearchKeyword,
    setSearchKeyword
  }
}
