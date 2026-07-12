import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScroller,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'
import { DataTable } from '@/components/organisms/data-table/data-table'
import { DataTableColumnVisibilitySelect } from '@/components/organisms/data-table/data-table-column-visibility-select'
import { useDataTable } from '@/components/organisms/data-table/lib'

interface Row {
  age: number
  firstName: string
  id: string
  lastName: string
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    accessorKey: 'firstName',
    header: 'First name',
    id: 'firstName',
    size: 112
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
    id: 'lastName',
    size: 112
  },
  {
    accessorKey: 'age',
    header: 'Age',
    id: 'age',
    size: 112
  }
]

const DATA: Row[] = [
  {
    age: 24,
    firstName: 'tanner',
    id: '1',
    lastName: 'linsley'
  },
  {
    age: 40,
    firstName: 'tandy',
    id: '2',
    lastName: 'miller'
  },
  {
    age: 45,
    firstName: 'joe',
    id: '3',
    lastName: 'dirte'
  }
]

export function DataTableColumnVisibility() {
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table</DialogTitle>
          <DialogDescription>Column visibility</DialogDescription>
        </DialogHeader>

        <DialogScroller>
          <div className='space-y-4'>
            <div className='flex justify-end'>
              <DataTableColumnVisibilitySelect table={table} />
            </div>
            <DataTable table={table} />
          </div>
        </DialogScroller>
      </DialogContent>
    </Dialog>
  )
}
