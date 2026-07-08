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
  address: string
  age: number
  firstName: string
  hobby: string
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
  },
  {
    accessorKey: 'address',
    header: 'Address',
    id: 'address'
  },
  {
    accessorKey: 'hobby',
    header: 'Hobby',
    id: 'hobby'
  }
]

const DATA: Row[] = [
  {
    address: 'Address 1',
    age: 24,
    firstName: 'tanner',
    hobby: 'Hobby 1',
    id: '1',
    lastName: 'linsley'
  },
  {
    address: 'Address 2',
    age: 40,
    firstName: 'tandy',
    hobby: 'Hobby 2',
    id: '2',
    lastName: 'miller'
  },
  {
    address: 'Address 3',
    age: 45,
    firstName: 'joe',
    hobby: 'Hobby 3',
    id: '3',
    lastName: 'dirte'
  }
]

export function DataTableColumnPinning() {
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    enableColumnPinning: true,
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table</DialogTitle>
          <DialogDescription>Column spinning</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
