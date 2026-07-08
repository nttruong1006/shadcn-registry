import { type Column, getCoreRowModel, type RowData, type TableOptions, useReactTable } from '@tanstack/react-table'

// Use data table
export function useDataTable<TData extends RowData>({
  enableColumnPinning = false,
  ...options
}: Omit<TableOptions<TData>, 'getCoreRowModel'>) {
  return useReactTable<TData>({
    enableColumnPinning,
    getRowId: (row: TData, index: number) =>
      typeof row === 'object' && row && 'id' in row ? String(row.id) : String(index),
    ...options,
    getCoreRowModel: getCoreRowModel()
  })
}

// Get common pinning styles
function getBoxShadow({
  isLastLeftPinnedColumn,
  isFirstRightPinnedColumn
}: {
  isLastLeftPinnedColumn: boolean
  isFirstRightPinnedColumn: boolean
}) {
  if (isLastLeftPinnedColumn) {
    return '-2px 0 2px -2px gray inset'
  }
  if (isFirstRightPinnedColumn) {
    return '2px 0 2px -2px gray inset'
  }
}

export function getCommonPinningStyles<TData extends RowData>(column: Column<TData>): React.CSSProperties {
  const pinningPosition = column.getIsPinned()
  const isLastLeftPinnedColumn = pinningPosition === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = pinningPosition === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: getBoxShadow({ isFirstRightPinnedColumn, isLastLeftPinnedColumn }),
    left: pinningPosition === 'left' ? `${column.getStart('left')}px` : undefined,
    minWidth: column.getSize(),
    position: pinningPosition ? 'sticky' : 'relative',
    right: pinningPosition === 'right' ? `${column.getAfter('right')}px` : undefined,
    zIndex: pinningPosition ? 1 : 0
  }
}

// Get number order
export function getNumberOrder(rowIndex: number, page: number, pageSize: number): number {
  return rowIndex + 1 + (page - 1) * pageSize
}
