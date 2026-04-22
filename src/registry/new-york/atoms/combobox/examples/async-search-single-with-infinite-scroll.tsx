import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useMemo, useState } from 'react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus
} from '@/components/atoms/combobox'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import { executeAxios } from '@/lib/axios'
import type { OptionsInfiniteQueryData, PaginationQueryData } from '@/types/api'
import type { Option } from '@/types/base'

export function ComboboxAsyncSearchSingleInfiniteScroll() {
  const [value, setValue] = useState<Option | null>(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedSearchKeyword = useDebounce(searchKeyword.trim(), 400)

  const optionsInfiniteQuery = useInfiniteQuery<
    OptionsInfiniteQueryData,
    DefaultError,
    InfiniteData<OptionsInfiniteQueryData>,
    QueryKey,
    number | undefined
  >({
    queryKey: [
      'https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/clerical/sender',
      debouncedSearchKeyword
    ],
    queryFn: ({ signal, pageParam }) => {
      return executeAxios({
        url: `https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/clerical/sender?page=${pageParam}&pageSize=${10}${debouncedSearchKeyword ? `&searchQuery=${debouncedSearchKeyword}` : ''}`,
        method: 'GET',
        signal
      })
    },
    initialPageParam: 1,
    getNextPageParam: useCallback((queryFn: unknown, _: unknown, page: unknown) => {
      const {
        responseData: { count, pageSize }
      } = queryFn as unknown as PaginationQueryData
      const queryPage = page as unknown as number
      const totalPage = Math.ceil(count / pageSize)

      if (!totalPage || queryPage === totalPage) {
        return null
      }
      return queryPage + 1
    }, [])
  })

  const items = useMemo<Option[]>(() => {
    const queryData = optionsInfiniteQuery.data?.pages.flatMap((page) => page.responseData.rows) ?? []

    if (value) {
      const valueIndex = queryData.findIndex((item) => item.value === value.value)
      if (valueIndex >= 0) {
        // Update reference of selected item bacause of queryData will be changed after refetching
        queryData[valueIndex] = value
      }
    }

    return queryData
  }, [value, optionsInfiniteQuery.data])

  return (
    <div>
      <Combobox
        filter={null}
        inputValue={searchKeyword}
        items={items}
        onInputValueChange={setSearchKeyword}
        onValueChange={setValue}
        value={value}
      >
        <ComboboxInput className='w-xs' disabled={optionsInfiniteQuery.isLoading} placeholder='Select information'>
          {optionsInfiniteQuery.isLoading && (
            <InputGroupAddon align='inline-start'>
              <Spinner />
            </InputGroupAddon>
          )}
        </ComboboxInput>

        <ComboboxContent>
          {optionsInfiniteQuery.isFetching && !optionsInfiniteQuery.isFetchingNextPage && (
            <ComboboxStatus className='flex items-center gap-2'>
              <Spinner />
              <span>Searching for "{debouncedSearchKeyword}"...</span>
            </ComboboxStatus>
          )}

          {!optionsInfiniteQuery.isFetching && items.length === 0 && (
            <ComboboxEmpty>No matched for "{debouncedSearchKeyword}"</ComboboxEmpty>
          )}

          <ComboboxList
            onScroll={(event) => {
              const { scrollTop, offsetHeight, scrollHeight } = event.target as HTMLDivElement
              if (
                scrollTop + offsetHeight >= scrollHeight - 28 * 20 &&
                !optionsInfiniteQuery.isFetchingNextPage &&
                optionsInfiniteQuery.hasNextPage
              ) {
                optionsInfiniteQuery.fetchNextPage()
              }
            }}
          >
            {(item: (typeof items)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>

          {optionsInfiniteQuery.isFetchingNextPage && (
            <ComboboxStatus className='flex justify-center'>
              <Spinner />
            </ComboboxStatus>
          )}
        </ComboboxContent>
      </Combobox>

      <div>{JSON.stringify(value)}</div>
    </div>
  )
}
