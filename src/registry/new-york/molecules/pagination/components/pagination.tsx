import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/atoms/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/atoms/tooltip'
import { cn } from '@/utils/ui'

export interface PaginationProps {
  page: number
  pageCount: number
  isHasPreviousPage?: boolean
  isHasNextPage?: boolean
  neighborPageCount?: number
  jumpedPageCount?: number
  onGoToPreviousPage?: () => void
  onGoToNextPage?: () => void
  onChangePage: (page: number) => void
}

export function Pagination({
  page,
  pageCount,
  isHasPreviousPage,
  isHasNextPage,
  neighborPageCount = 1,
  jumpedPageCount = 5,
  onChangePage,
  onGoToPreviousPage,
  onGoToNextPage
}: PaginationProps) {
  const goToPreviousPage = () => {
    if (onGoToPreviousPage) {
      return onGoToPreviousPage()
    }
    onChangePage(page - 1)
  }

  const goToNextPage = () => {
    if (onGoToNextPage) {
      return onGoToNextPage()
    }
    onChangePage(page + 1)
  }

  const jumpPreviousPages = () => {
    const newPage = Math.max(1, page - jumpedPageCount)
    onChangePage(newPage)
  }

  const jumpNextPages = () => {
    const newPage = Math.min(pageCount, page + jumpedPageCount)
    onChangePage(newPage)
  }

  const displayedPages = useMemo(() => {
    const result: number[] = []

    if (pageCount <= 3 + neighborPageCount * 2) {
      if (pageCount === 0) {
        result.push(1)
      }

      for (let i = 1; i <= pageCount; i += 1) {
        result.push(i)
      }
    } else {
      let left = Math.max(1, page - neighborPageCount)
      let right = Math.min(page + neighborPageCount, pageCount)

      if (page - 1 <= neighborPageCount) {
        right = 1 + neighborPageCount * 2
      }

      if (pageCount - page <= neighborPageCount) {
        left = pageCount - neighborPageCount * 2
      }

      for (let i = left; i <= right; i += 1) {
        result.push(i)
      }

      if (page - 1 >= neighborPageCount * 2 && page !== 1 + 2) {
        result.unshift(Number.NEGATIVE_INFINITY)
      }

      if (pageCount - page >= neighborPageCount * 2 && page !== pageCount - 2) {
        result.push(Number.POSITIVE_INFINITY)
      }

      if (left !== 1) {
        result.unshift(1)
      }

      if (right !== pageCount) {
        result.push(pageCount)
      }
    }

    return result
  }, [neighborPageCount, page, pageCount])

  return (
    <div className='flex select-none items-center gap-1'>
      {/* Previous */}
      <Button
        className='hidden xl:inline-flex'
        disabled={!(isHasPreviousPage || page > 1)}
        onClick={goToPreviousPage}
        size='icon'
        variant='ghost'
      >
        <ChevronLeft />
      </Button>

      {displayedPages.map((displayedPage) => {
        // Previous jumping
        if (displayedPage === Number.NEGATIVE_INFINITY) {
          return (
            <TooltipProvider delay={400} key={displayedPage}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button className='group' onClick={jumpPreviousPages} size='icon' variant='ghost'>
                      <MoreHorizontal className='block group-hover:hidden' />
                      <ChevronsLeft className='hidden group-hover:block' />
                    </Button>
                  }
                />
                <TooltipContent>{jumpedPageCount} previous pages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        // Next jumping
        if (displayedPage === Number.POSITIVE_INFINITY) {
          return (
            <TooltipProvider delay={400} key={displayedPage}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button className='group' onClick={jumpNextPages} size='icon' variant='ghost'>
                      <MoreHorizontal className='block group-hover:hidden' />
                      <ChevronsRight className='hidden group-hover:block' />
                    </Button>
                  }
                />
                <TooltipContent>{jumpedPageCount} next pages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        const isActive = displayedPage === page

        // Page
        return (
          <Button
            key={displayedPage}
            onClick={() => onChangePage(displayedPage)}
            size={displayedPage > 9999 ? 'default' : 'icon'}
            variant={isActive ? 'default' : 'ghost'}
          >
            <span className={cn('z-10 tabular-nums', isActive && 'text-primary-foreground')}>{displayedPage}</span>
          </Button>
        )
      })}

      {/* Next */}
      <Button
        className='hidden xl:inline-flex'
        disabled={!(isHasNextPage || page < pageCount)}
        onClick={goToNextPage}
        size='icon'
        variant='ghost'
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
