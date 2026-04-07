import type { HeaderContext, RowData } from '@tanstack/react-table'
import { Checkbox } from '@/components/atoms/checkbox'

export function DataTableCheckboxHeader<TData extends RowData>({ table }: HeaderContext<TData, unknown>) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value)
          table.options.meta?.setIsSelectAllRows?.(false)
        }}
      />
    </div>
  )
}
