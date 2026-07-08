import type { Table as ReactTable, Row, RowData } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { Table } from '@/components/atoms/table'
import { LoadingOverlay } from '@/components/molecules/loading-overlay'
import { cn } from '@/utils/ui'
import DataTableAdditionalInfo from './data-table-additional-info'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'
import DataTablePagination from './data-table-pagination'
import DataTableRowSelect from './data-table-row-select'

export interface DataTableProps<TData extends RowData> {
  className?: {
    container?: string
    table?: string
    tableHeader?: string
    tableBody?: string
    tableFooter?: string
    tablePagination?: string
  }
  error?: boolean
  id?: string
  loading?: boolean
  onRenderAdditionalRow?: (table: ReactTable<TData>) => ReactNode
  onRenderSubComponent?: (row: Row<TData>) => ReactNode
  showFooter?: boolean
  showPagination?: boolean
  table: ReactTable<TData>
}

export function DataTable<TData extends RowData>({
  id,
  table,
  loading = false,
  error = false,
  showFooter = false,
  showPagination = true,
  className,
  onRenderSubComponent,
  onRenderAdditionalRow
}: DataTableProps<TData>) {
  return (
    <div
      className={cn(
        'flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-md border',
        className?.container
      )}
      id={id}
    >
      <Table className={className?.table}>
        {/* Table header */}
        <DataTableHeader className={className?.tableHeader} table={table} />

        {/* Table body */}
        <DataTableBody
          className={className?.tableBody}
          onRenderAdditionalRow={onRenderAdditionalRow}
          onRenderSubComponent={onRenderSubComponent}
          table={table}
        />

        {/* Table footer */}
        {showFooter && <DataTableFooter className={className?.tableFooter} table={table} />}
      </Table>

      {/* Additional info */}
      <DataTableAdditionalInfo error={error} loading={loading} table={table} />

      {/* Row select */}
      <DataTableRowSelect table={table} />

      {/* Pagination */}
      {showPagination && <DataTablePagination className={className?.tablePagination} table={table} />}

      {/* Loading overlay */}
      <LoadingOverlay loading={loading} />
    </div>
  )
}
