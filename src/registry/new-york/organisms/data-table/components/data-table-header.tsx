import { flexRender, type RowData } from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, PinOffIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { TableHead, TableHeader, TableRow } from '@/components/atoms/table'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'
import { getCommonPinningStyles } from './lib'

function DataTableHeader<TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & { className?: string }) {
  return (
    <TableHeader className={cn('sticky top-0 z-20', className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className='bg-background hover:bg-background' key={headerGroup.id}>
          {headerGroup.headers.map((header, headerIndex) => {
            const pinningPosition = header.column.getIsPinned()

            const columnRelativeDepth = header.depth - header.column.depth
            if (columnRelativeDepth > 1) {
              return null
            }

            let rowSpan = 1
            if (header.isPlaceholder) {
              const leafs = header.getLeafHeaders()
              const lastLeftDepth = leafs.at(-1)?.depth
              if (lastLeftDepth) {
                rowSpan = lastLeftDepth - header.depth
              }
            }

            return (
              <TableHead
                className={cn('space-y-1 border-b border-l', header.column.columnDef.meta?.className, {
                  'first:border-l-0': headerIndex === 0
                })}
                colSpan={header.colSpan}
                key={header.id}
                rowSpan={rowSpan}
                style={{
                  ...getCommonPinningStyles(header.column)
                }}
              >
                <div className='whitespace-nowrap'>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>

                {header.column.getCanPin() && (
                  <div className='flex gap-2'>
                    {pinningPosition !== 'left' && (
                      <Button
                        onClick={() => {
                          header.column.pin('left')
                        }}
                        size='icon-xs'
                        variant='outline'
                      >
                        <ChevronLeftIcon />
                      </Button>
                    )}

                    {pinningPosition && (
                      <Button
                        onClick={() => {
                          header.column.pin(false)
                        }}
                        size='icon-xs'
                        variant='outline'
                      >
                        <PinOffIcon />
                      </Button>
                    )}

                    {pinningPosition !== 'right' && (
                      <Button
                        onClick={() => {
                          header.column.pin('right')
                        }}
                        size='icon-xs'
                        variant='outline'
                      >
                        <ChevronRightIcon />
                      </Button>
                    )}
                  </div>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
