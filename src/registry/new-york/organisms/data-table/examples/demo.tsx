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
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45
  }
]

// Component
export const DataTableDemo = () => {
  // Hooks
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
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
          <DialogDescription>Demo</DialogDescription>
        </DialogHeader>

        <DialogScrollableContent>
          <DataTable table={table} />
        </DialogScrollableContent>
      </DialogContent>
    </Dialog>
  )
}
