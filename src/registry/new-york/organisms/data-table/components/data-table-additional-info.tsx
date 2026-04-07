import type { RowData } from '@tanstack/react-table'
import type { DataTableProps } from './data-table'

function DataTableAdditionalInfo<TData extends RowData>({
  table,
  loading,
  error
}: Pick<DataTableProps<TData>, 'table' | 'error' | 'loading'>) {
  const rowLength = table.getRowModel().rows.length
  const empty = !(rowLength || loading)

  if (error) {
    return <div className='flex items-center justify-center p-4'>An error occurred, please reload the page</div>
  }

  if (empty) {
    return <div className='flex items-center justify-center p-4'>No data available</div>
  }

  return null
}

export default DataTableAdditionalInfo
