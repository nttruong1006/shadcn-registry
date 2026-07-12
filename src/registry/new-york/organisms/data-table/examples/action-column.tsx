import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { FilePenLineIcon, SearchIcon, TrashIcon } from 'lucide-react'
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
import { DataTableActionCell } from '@/components/organisms/data-table/data-table-action-cell'
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
  },
  {
    cell: () => (
      <DataTableActionCell
        menus={[
          {
            icon: <SearchIcon />,
            id: 'search',
            label: 'View',
            onClick: () => {
              console.log('Clicked ...')
            },
            type: 'event'
          },
          {
            icon: <FilePenLineIcon />,
            id: 'update',
            label: 'Update',
            onClick: () => {
              console.log('Clicked ...')
            },
            type: 'event'
          },
          {
            icon: <TrashIcon />,
            id: 'delete',
            label: 'Delete',
            onClick: () => {
              console.log('Clicked ...')
            },
            type: 'event',
            variant: 'destructive'
          }
        ]}
      />
    ),
    header: 'Action',
    id: 'action',
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

export function DataTableActionCellDemo() {
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
          <DialogDescription>Action column</DialogDescription>
        </DialogHeader>

        <DialogScroller>
          <DataTable table={table} />
        </DialogScroller>
      </DialogContent>
    </Dialog>
  )
}
