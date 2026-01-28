import type { Table as ReactTable, Row, RowData } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { LoadingOverlay } from '@/registry/new-york/molecules/loading-overlay/components/loading-overlay'
import { Table } from '@/registry/new-york/ui/table/components/table'
import { cn } from '@/utils/ui'
import DataTableAdditionalInfo from './data-table-additional-info'
import DataTableBody from './data-table-body'
import DataTableFooter from './data-table-footer'
import DataTableHeader from './data-table-header'
import DataTablePagination from './data-table-pagination'
import DataTableRowSelection from './data-table-row-selection'

// Data table
export interface DataTableProps<TData extends RowData> {
  id?: string
  table: ReactTable<TData>
  isLoading?: boolean
  isError?: boolean
  isDisplayFooter?: boolean
  isDisplayPagination?: boolean
  className?: {
    container?: string
    table?: string
    tableHeader?: string
    tableBody?: string
    tableFooter?: string
    tablePagination?: string
  }
  onRenderSubComponent?: (row: Row<TData>) => ReactNode
  onRenderAdditionalRow?: (table: ReactTable<TData>) => ReactNode
}

export const DataTable = <TData extends RowData>({
  id,
  table,
  isLoading = false,
  isError = false,
  isDisplayFooter = false,
  isDisplayPagination = true,
  className,
  onRenderSubComponent,
  onRenderAdditionalRow
}: DataTableProps<TData>) => {
  return (
    // Template
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
        {isDisplayFooter && <DataTableFooter className={className?.tableFooter} table={table} />}
      </Table>

      {/* Additional info */}
      <DataTableAdditionalInfo isError={isError} isLoading={isLoading} table={table} />

      {/* Row selection */}
      <DataTableRowSelection table={table} />

      {/* Pagination */}
      {isDisplayPagination && <DataTablePagination className={className?.tablePagination} table={table} />}

      {/* Loading overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  )
}
