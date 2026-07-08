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
  progress: number
  status: string
  visits: number
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    columns: [
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
      }
    ],
    header: () => <div className='text-center'>Name</div>,
    id: 'name',
    size: 112
  },
  {
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        id: 'age',
        size: 64
      },
      {
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            id: 'visits',
            size: 64
          },
          {
            accessorKey: 'status',
            header: 'Status',
            id: 'status',
            size: 112
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            id: 'progress',
            size: 112
          }
        ],
        header: () => <div className='text-center'>More Info</div>,
        id: 'moreInfo'
      }
    ],
    header: () => <div className='text-center'>Info</div>,
    id: 'info'
  }
]

const DATA: Row[] = [
  {
    age: 24,
    firstName: 'tanner',
    id: '1',
    lastName: 'linsley',
    progress: 50,
    status: 'In Relationship',
    visits: 100
  },
  {
    age: 40,
    firstName: 'tandy',
    id: '2',
    lastName: 'miller',
    progress: 80,
    status: 'Single',
    visits: 40
  },
  {
    age: 45,
    firstName: 'joe',
    id: '3',
    lastName: 'dirte',
    progress: 10,
    status: 'Complicated',
    visits: 20
  }
]

export function DataTableColumnSpanning() {
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
          <DialogDescription>Column spanning</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
