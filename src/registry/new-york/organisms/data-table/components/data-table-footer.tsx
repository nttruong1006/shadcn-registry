import { flexRender, type RowData } from '@tanstack/react-table'
import { TableCell, TableFooter, TableRow } from '@/components/atoms/table'
import type { DataTableProps } from './data-table'

export default function DataTableFooter<TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & {
  className?: string
}) {
  return (
    <TableFooter className={className}>
      {table.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell colSpan={header.colSpan} key={header.id}>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  )
}
