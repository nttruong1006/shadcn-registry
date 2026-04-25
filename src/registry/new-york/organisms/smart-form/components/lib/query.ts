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

// Use options query
export const useOptionsQuery = ({
  originalQueryPath,
  dependencyFieldsValue
}: {
  originalQueryPath: string
  dependencyFieldsValue?: Record<string, unknown>
}) => {
  const [queryPath, setQueryPath] = useState(originalQueryPath)
  const [enabled, setEnabled] = useState(!originalQueryPath?.includes('/{'))

  const optionsQuery = useQuery<{
    responseData: {
      rows: Option[]
    }
  }>({
    queryKey: queryPath.split('?'),
    queryFn: ({ signal }) => {
      return executeAxios({ url: queryPath, method: 'GET', signal })
    },
    enabled
  })

  useEffect(() => {
    if (!dependencyFieldsValue) {
      return
    }

    const newQueryPath = Object.keys(dependencyFieldsValue).reduce<string>((result, fieldName) => {
      const value = dependencyFieldsValue[fieldName]
      if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
        return result
      }
      return result.replace(`{${fieldName}}`, value.toString())
    }, originalQueryPath)

    setQueryPath(newQueryPath)
    setEnabled(!newQueryPath?.includes('/{'))
  }, [dependencyFieldsValue, originalQueryPath])

  const options = useMemo<Option[]>(() => {
    if (!enabled) {
      return []
    }
    return (
      optionsQuery.data?.responseData?.rows.map((option) => ({
        value: option.value,
        label: typeof option.label === 'string' ? option.label : JSON.stringify(option.label)
      })) ?? []
    )
  }, [enabled, optionsQuery.data])

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
  event: UIEvent<HTMLDivElement, UIEvent>
  infiniteQuery: UseInfiniteQueryResult
}) => {
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
  originalQueryPath,
  dependencyFieldsValue,
  selectedValue,
  valueAsLabel = false
}: {
  originalQueryPath: string
  selectedValue: string | null | undefined // If value is array, separate by the "," character
  dependencyFieldsValue?: Record<string, unknown>
  valueAsLabel?: boolean
}) => {
  const [queryPath, setQueryPath] = useState(originalQueryPath)
  const [enabled, setEnabled] = useState(!originalQueryPath?.includes('/{'))
  const [searchKeyword, setSearchKeyword] = useState('')

  const debouncedSearchKeyword = useDebounce(valueAsLabel ? selectedValue?.trim() : searchKeyword.trim(), 400)

  const optionsInfiniteQuery = useInfiniteQuery<
    OptionsInfiniteQueryData,
    DefaultError,
    InfiniteData<OptionsInfiniteQueryData>,
    QueryKey,
    number | undefined
  >({
    queryKey: queryPath ? [...queryPath.split('?'), debouncedSearchKeyword] : [debouncedSearchKeyword],
    queryFn: ({ signal, pageParam }) => {
      return executeAxios({
        url: valueAsLabel
          ? `${queryPath}${queryPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`
          : `${queryPath}${queryPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${selectedValue ? `&preSelected=${selectedValue}` : ''}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
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

    const newQueryPath = Object.keys(dependencyFieldsValue).reduce<string>((result, fieldName) => {
      const value = dependencyFieldsValue[fieldName]
      if (value == null || (typeof value !== 'number' && typeof value !== 'string')) {
        return result
      }
      return result.replace(`{${fieldName}}`, value.toString())
    }, originalQueryPath)

    setQueryPath(newQueryPath)
    setEnabled(!newQueryPath?.includes('/{'))
  }, [dependencyFieldsValue, originalQueryPath])

  const options = useMemo<Option[]>(() => {
    if (!enabled) {
      return []
    }
    return optionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []
  }, [enabled, optionsInfiniteQuery.data])

  return {
    optionsInfiniteQuery,
    options,
    searchKeyword,
    setSearchKeyword
  }
}
