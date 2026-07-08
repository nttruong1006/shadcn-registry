import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScroll,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'
import { DataTable } from '@/components/organisms/data-table/data-table'
import { DataTableCheckboxCell } from '@/components/organisms/data-table/data-table-checkbox-cell'
import { DataTableCheckboxHeader } from '@/components/organisms/data-table/data-table-checkbox-header'
import { useDataTable } from '@/components/organisms/data-table/lib'

interface Row {
  age: number
  firstName: string
  id: string
  lastName: string
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    cell: DataTableCheckboxCell,
    header: DataTableCheckboxHeader,
    id: 'selection',
    size: 80
  },
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

export function DataTableSelection() {
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      rowSelection: {}
    }
  })

  // Template
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table demo</DialogTitle>
          <DialogDescription>Selection</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
