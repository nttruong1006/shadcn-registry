import { type Column, getCoreRowModel, type RowData, type TableOptions, useReactTable } from '@tanstack/react-table'

// Use data table
export const useDataTable = <TData extends RowData>({
  enableColumnPinning = false,
  ...options
}: Omit<TableOptions<TData>, 'getCoreRowModel'>) => {
  return useReactTable<TData>({
    enableColumnPinning,
    getRowId: (row: TData, index: number) =>
      typeof row === 'object' && row && 'id' in row ? String(row.id) : String(index),
    ...options,
    getCoreRowModel: getCoreRowModel()
  })
}

// Get common pinning styles
const getBoxShadow = ({
  isLastLeftPinnedColumn,
  isFirstRightPinnedColumn
}: {
  isLastLeftPinnedColumn: boolean
  isFirstRightPinnedColumn: boolean
}) => {
  if (isLastLeftPinnedColumn) {
    return '-2px 0 2px -2px gray inset'
  }
  if (isFirstRightPinnedColumn) {
    return '2px 0 2px -2px gray inset'
  }
  return undefined
}

export const getCommonPinningStyles = <TData extends RowData>(column: Column<TData>): React.CSSProperties => {
  const pinningPosition = column.getIsPinned()
  const isLastLeftPinnedColumn = pinningPosition === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn = pinningPosition === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: getBoxShadow({ isLastLeftPinnedColumn, isFirstRightPinnedColumn }),
    left: pinningPosition === 'left' ? `${column.getStart('left')}px` : undefined,
    right: pinningPosition === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: pinningPosition ? 'sticky' : 'relative',
    minWidth: column.getSize(),
    zIndex: pinningPosition ? 1 : 0
  }
}

// Get number order
export const getNumberOrder = (rowIndex: number, page = 1, pageSize = 10): number => {
  return rowIndex + 1 + (page - 1) * pageSize
}
