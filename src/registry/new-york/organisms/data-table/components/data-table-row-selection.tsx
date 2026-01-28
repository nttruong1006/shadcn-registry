import type { RowData } from '@tanstack/react-table'
import { ListChecksIcon } from 'lucide-react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/registry/new-york/ui/tooltip/components/tooltip'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'

// Component
const DataTableRowSelection = <TData extends RowData>({ table }: Pick<DataTableProps<TData>, 'table'>) => {
  const rowCount = table.getRowCount()
  const rowSelectionLength = Object.keys(table.getState().rowSelection).length
  const pageRowCount = table.getPreFilteredRowModel().rows.length
  const { isSelectAllRows, setIsSelectAllRows } = table.options.meta ?? {}

  // Methods
  const toggleSelectAllRows = () => {
    setIsSelectAllRows?.((prev) => !prev)
    table.toggleAllPageRowsSelected(!isSelectAllRows)
  }

  // Template
  if (rowSelectionLength === 0) {
    return null
  }

  return (
    <div
      className={cn('w-full animate-in bg-muted/50 p-4 text-sm', {
        'fade-in slide-in-from-top-60': rowSelectionLength > 0
      })}
    >
      <span>
        {isSelectAllRows ? `All ${rowCount} rows selected` : `${rowSelectionLength}/${pageRowCount} rows selected`}
      </span>

      {pageRowCount < rowCount && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={toggleSelectAllRows} size='icon-sm' variant='outline'>
                <ListChecksIcon />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              {isSelectAllRows ? `Unselect all ${rowCount} rows` : `Select all ${rowCount} rows`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export default DataTableRowSelection
