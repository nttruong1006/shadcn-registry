import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/registry/new-york/ui/tooltip/components/tooltip'
import { cn } from '@/utils/ui'

// Pagination
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

export const Pagination = ({
  page,
  pageCount,
  isHasPreviousPage,
  isHasNextPage,
  neighborPageCount = 1,
  jumpedPageCount = 5,
  onChangePage,
  onGoToPreviousPage,
  onGoToNextPage
}: PaginationProps) => {
  // Methods
  // Handle go to previous page
  const handleGoToPreviousPage = () => {
    if (onGoToPreviousPage) {
      return onGoToPreviousPage()
    }
    onChangePage(page - 1)
  }

  // Handle go to next page
  const handleGoToNextPage = () => {
    if (onGoToNextPage) {
      return onGoToNextPage()
    }
    onChangePage(page + 1)
  }

  // Handle jump previous pages
  const handleJumpPreviousPages = () => {
    const newPage = Math.max(1, page - jumpedPageCount)
    onChangePage(newPage)
  }

  // Handle jump next pages
  const handleJumpNextPages = () => {
    const newPage = Math.min(pageCount, page + jumpedPageCount)
    onChangePage(newPage)
  }

  // Memos
  // Displayed pages
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

  // Template
  return (
    <div className='flex select-none items-center gap-1'>
      {/* Previous */}
      <Button
        className='hidden xl:inline-flex'
        disabled={!(isHasPreviousPage || page > 1)}
        onClick={handleGoToPreviousPage}
        size='icon'
        variant='ghost'
      >
        <ChevronLeft />
      </Button>

      {displayedPages.map((displayedPage) => {
        // Previous jumping
        if (displayedPage === Number.NEGATIVE_INFINITY) {
          return (
            <TooltipProvider delayDuration={400} key={displayedPage}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className='group' onClick={handleJumpPreviousPages} size='icon' variant='ghost'>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsLeft className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{jumpedPageCount} previous pages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }

        // Next jumping
        if (displayedPage === Number.POSITIVE_INFINITY) {
          return (
            <TooltipProvider delayDuration={400} key={displayedPage}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className='group' onClick={handleJumpNextPages} size='icon' variant='ghost'>
                    <MoreHorizontal className='block group-hover:hidden' />
                    <ChevronsRight className='hidden group-hover:block' />
                  </Button>
                </TooltipTrigger>

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
        onClick={handleGoToNextPage}
        size='icon'
        variant='ghost'
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
