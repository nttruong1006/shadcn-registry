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
    id: 'firstName'
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
    id: 'lastName'
  },
  {
    accessorKey: 'age',
    header: 'Age',
    id: 'age'
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

export function DataTableDemo() {
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
          <DialogDescription>Demo</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
