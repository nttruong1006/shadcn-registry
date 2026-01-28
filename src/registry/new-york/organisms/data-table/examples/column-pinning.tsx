import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { DataTable } from '@/registry/new-york/organisms/data-table/components/data-table'
import { useDataTable } from '@/registry/new-york/organisms/data-table/components/lib'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger
} from '@/registry/new-york/ui/dialog/components/dialog'

interface Row {
  id: string
  firstName: string
  lastName: string
  age: number
  address: string
  hobby: string
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name'
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name'
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: 'Age'
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: 'Address'
  },
  {
    id: 'hobby',
    accessorKey: 'hobby',
    header: 'Hobby'
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    address: 'Address 1',
    hobby: 'Hobby 1'
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    address: 'Address 2',
    hobby: 'Hobby 2'
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    address: 'Address 3',
    hobby: 'Hobby 3'
  }
]

// Component
export const DataTableColumnPinning = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    enableColumnPinning: true,
    getPaginationRowModel: getPaginationRowModel()
  })

  // Template
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table</DialogTitle>
          <DialogDescription>Column spinning</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <DataTable table={table} />
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
