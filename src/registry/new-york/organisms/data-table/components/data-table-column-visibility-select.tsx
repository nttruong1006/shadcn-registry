import type { Column, RowData, Table, VisibilityState } from '@tanstack/react-table'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/atoms/checkbox'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from '@/components/atoms/combobox'
import { InputGroupAddon } from '@/components/atoms/input-group'

export function DataTableColumnVisibilitySelect<TData extends RowData>({ table }: { table: Table<TData> }) {
  const [columns] = useState(() =>
    table
      .getAllLeafColumns()
      .filter((column) => column.id && column.getCanHide() && typeof column.columnDef.header === 'string')
  )

  const { columnVisibility } = table.getState()
  const visibleColumns = columns.filter((column) => columnVisibility[column.id] ?? true)

  const allColumnsVisible = table.getIsAllColumnsVisible()
  const someColumnsVisible = table.getIsSomeColumnsVisible()

  return (
    <Combobox
      items={columns}
      multiple
      onValueChange={(value) => {
        table.setColumnVisibility(() => {
          const newColumnVisibility = columns.reduce<VisibilityState>((acc, column) => {
            acc[column.id] = false
            return acc
          }, {})

          for (const column of value) {
            newColumnVisibility[column.id] = true
          }

          return newColumnVisibility
        })
      }}
      value={visibleColumns}
    >
      <ComboboxTrigger
        render={
          <Button className='w-64 justify-between font-normal' variant='outline'>
            <span>Columns</span>
            <ChevronDownIcon className='text-muted-foreground' />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput placeholder='Search' showTrigger={false}>
          <InputGroupAddon
            align='inline-start'
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Checkbox
              checked={allColumnsVisible}
              className='cursor-default'
              indeterminate={!allColumnsVisible && someColumnsVisible}
              onCheckedChange={(checked) => {
                table.toggleAllColumnsVisible(checked)
              }}
            />
          </InputGroupAddon>
        </ComboboxInput>

        <ComboboxEmpty>No columns found.</ComboboxEmpty>
        <ComboboxList>
          {(column: Column<TData, unknown>) => (
            <ComboboxItem key={column.id} value={column}>
              {column.columnDef.header as string}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
