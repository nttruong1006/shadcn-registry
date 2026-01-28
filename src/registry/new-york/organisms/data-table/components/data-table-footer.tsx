import { flexRender, type RowData } from '@tanstack/react-table'
import { TableCell, TableFooter, TableRow } from '@/registry/new-york/ui/table/components/table'
import type { DataTableProps } from './data-table'

// Component
const DataTableFooter = <TData extends RowData>({
  table,
  className
}: Pick<DataTableProps<TData>, 'table'> & {
  className?: string
}) => {
  // Template
  return (
    <TableFooter className={className}>
      {/* Row */}
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

export default DataTableFooter
