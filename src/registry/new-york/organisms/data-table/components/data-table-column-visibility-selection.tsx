import type { RowData, Table } from '@tanstack/react-table'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/registry/new-york/ui/command/components/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { cn } from '@/utils/ui'

// Component
export const DataTableColumnVisibilitySelection = <TData extends RowData>({ table }: { table: Table<TData> }) => {
  // Template
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={cn('font-normal [&_svg]:pointer-events-auto')} variant='outline'>
          <span>Columns</span>
          <ChevronDownIcon className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='min-w-(--radix-popover-trigger-width) p-0'>
        <Command>
          <div className='flex items-center gap-2 border-input border-b px-3'>
            <Checkbox
              checked={table.getIsAllColumnsVisible() || (table.getIsSomeColumnsVisible() && 'indeterminate')}
              onCheckedChange={(checked) => {
                table.toggleAllColumnsVisible(checked as boolean)
              }}
            />
            <div className='[&>div]:flex-1 [&>div]:border-b-0 [&>div]:border-b-none [&>div]:px-0'>
              <CommandInput placeholder='Search' />
            </div>
          </div>

          <CommandList className='scrollbar'>
            <CommandEmpty>No column found.</CommandEmpty>
            <CommandGroup>
              {table.getAllLeafColumns().map((column) => {
                if (typeof column.columnDef.header !== 'string' || !column.getCanHide()) {
                  return null
                }

                const isSelected = column.getIsVisible()
                const label = column.columnDef.header

                return (
                  <CommandItem key={column.id} onSelect={() => column.toggleVisibility(!isSelected)} value={label}>
                    <Checkbox checked={isSelected} />
                    <span>{label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
