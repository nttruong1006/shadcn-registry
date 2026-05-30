import { flexRender, type RowData } from '@tanstack/react-table'
import React from 'react'
import { TableBody, TableCell, TableRow } from '@/components/atoms/table'
import { cn } from '@/utils/ui'
import type { DataTableProps } from './data-table'
import { getCommonPinningStyles } from './lib'

export default function DataTableBody<TData extends RowData>({
  table,
  className,
  onRenderSubComponent,
  onRenderAdditionalRow
}: Pick<DataTableProps<TData>, 'table' | 'onRenderSubComponent' | 'onRenderAdditionalRow'> & {
  className?: string
}) {
  const rows = table.getRowModel().rows

  return (
    <TableBody className={cn('relative', className)}>
      {rows.map((row) => {
        const isExpanded = row.getIsExpanded()
        const rowClassName: string =
          (typeof row.original === 'object' && row.original && 'className' in row.original
            ? (row.original.className as string)
            : '') ?? ''

        return (
          <React.Fragment key={row.id}>
            <TableRow
              className={cn('[&:not(:last-child)_td]:border-b', isExpanded && 'border-b-0', rowClassName)}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ ...getCommonPinningStyles(cell.column) }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>

            {/* Sub component */}
            {onRenderSubComponent && (
              <TableRow
                className={cn('hidden', {
                  'table-row': isExpanded
                })}
              >
                <TableCell colSpan={row.getVisibleCells().length}>{onRenderSubComponent(row)}</TableCell>
              </TableRow>
            )}
          </React.Fragment>
        )
      })}

      {onRenderAdditionalRow && (
        <TableRow>
          <TableCell colSpan={table.getAllFlatColumns().length}>{onRenderAdditionalRow(table)}</TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}
