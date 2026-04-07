import type { CellContext, RowData } from '@tanstack/react-table'
import { Checkbox } from '@/components/atoms/checkbox'

export function DataTableCheckboxCell<TData extends RowData>({ table, row }: CellContext<TData, unknown>) {
  return (
    <div className='flex h-full items-center justify-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value as boolean)
          table?.options.meta?.setIsSelectAllRows?.(false)
        }}
      />
    </div>
  )
}
