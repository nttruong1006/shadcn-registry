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
import { type UIEvent, useMemo, useState } from 'react'
import { executeAxios } from '@/lib/axios'
import type { OptionsInfiniteQueryData, PaginationQueryData } from '@/types/api'
import type { Option } from '@/types/base'

// Use options query
export const useOptionsQuery = ({ apiPath }: { apiPath: string | undefined }) => {
  // Queries
  const optionsQuery = useQuery<{
    responseData: {
      rows: Option[]
    }
  }>({
    queryKey: apiPath ? apiPath.split('?') : [],
    queryFn: ({ signal }) => {
      return executeAxios({ url: apiPath, method: 'GET', signal })
    },
    enabled: Boolean(apiPath)
  })

  // Memos
  const options = useMemo<Option[]>(() => {
    return (
      optionsQuery.data?.responseData?.rows.map((option) => ({
        value: option.value,
        label: typeof option.label === 'string' ? option.label : JSON.stringify(option.label)
      })) ?? []
    )
  }, [optionsQuery.data])

  return {
    optionsQuery,
    options
  }
}

// Use options infinite query
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
export const fetchNextPage = (args: { event: UIEvent<HTMLDivElement>; infiniteQuery: UseInfiniteQueryResult }) => {
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

export const useOptionsInfiniteQuery = ({ apiPath }: { apiPath: string | undefined }) => {
  // States
  const [searchKeyword, setSearchKeyword] = useState('')

  // Debounced
  const debouncedSearchKeyword = useDebounce(searchKeyword.trim(), 400)

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
        url: `${apiPath}${apiPath?.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
        method: 'GET',
        signal
      })
    },
    enabled: Boolean(apiPath),
    initialPageParam: 1,
    getNextPageParam
  })

  // Memos
  const options = useMemo<Option[]>(() => {
    return optionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []
  }, [optionsInfiniteQuery.data])

  return {
    optionsInfiniteQuery,
    options,
    searchKeyword,
    setSearchKeyword
  }
}
