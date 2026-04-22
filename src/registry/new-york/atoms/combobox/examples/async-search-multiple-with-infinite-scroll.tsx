import { type DefaultError, type InfiniteData, type QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useCallback, useMemo, useState } from 'react'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'
import { Spinner } from '@/components/atoms/spinner'
import { executeAxios } from '@/lib/axios'
import type { OptionsInfiniteQueryData, PaginationQueryData } from '@/types/api'
import type { Option } from '@/types/base'

export function ComboboxAsyncSearchMultipleInfiniteScroll() {
  const anchor = useComboboxAnchor()
  const [value, setValue] = useState<Option[]>([])
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
  }, [value, optionsInfiniteQuery.data])

  return (
    <Combobox
      filter={null}
      inputValue={searchKeyword}
      items={items}
      multiple
      onInputValueChange={setSearchKeyword}
      onValueChange={setValue}
      value={value}
    >
      <ComboboxChips className='w-xs' ref={anchor}>
        {optionsInfiniteQuery.isLoading && <Spinner className='text-muted-foreground' />}

        <ComboboxValue>
          {(value: typeof items) => {
            return value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
          }}
        </ComboboxValue>

        <ComboboxChipsInput
          disabled={optionsInfiniteQuery.isLoading}
          placeholder={value.length > 0 ? '' : 'Select information'}
        />
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
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
  )
}
