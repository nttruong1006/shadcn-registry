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

// Use get options query
export function useGetOptionsQuery({ apiPath }: { apiPath: string }) {
  const getOptionsQuery = useQuery<{
    responseData: {
      rows: Option[]
    }
  }>({
    queryKey: apiPath.split('?'),
    queryFn: ({ signal }) => {
      return executeAxios({ url: apiPath, method: 'GET', signal })
    }
  })

  const options = useMemo(() => {
    return getOptionsQuery.data?.responseData?.rows ?? []
  }, [getOptionsQuery.data])

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
export function useGetOptionsInfiniteQuery({ apiPath }: { apiPath: string }) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearchKeyword = useDebounce(searchKeyword.trim(), 400)

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
        url: `${apiPath}${apiPath.includes('?') ? '&' : '?'}page=${pageParam}&pageSize=${infiniteQueryPageSize}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
        method: 'GET',
        signal
      })
    },
    initialPageParam: 1,
    getNextPageParam
  })

  const options = useMemo<Option[]>(() => {
    return getOptionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []
  }, [getOptionsInfiniteQuery.data])

  return {
    getOptionsInfiniteQuery,
    options,
    searchKeyword,
    debouncedSearchKeyword,
    setSearchKeyword
  }
}
