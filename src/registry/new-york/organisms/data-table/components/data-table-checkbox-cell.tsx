import type { Row, RowData, Table } from '@tanstack/react-table'
import { Checkbox, type CheckboxProps } from '@/registry/new-york/ui/checkbox/components/checkbox'

// Component
export const DataTableCheckboxCell = <TData extends RowData>({
  table,
  row,
  checkboxProps
}: {
  table: Table<TData>
  row: Row<TData>
  checkboxProps?: CheckboxProps
}) => {
  // Template
  return (
    <div className='flex h-full items-center justify-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value as boolean)
          table?.options.meta?.setIsSelectAllRows?.(false)
        }}
        {...checkboxProps}
      />
    </div>
  )
}
