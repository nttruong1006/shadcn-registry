import { type ColumnDef, getPaginationRowModel } from '@tanstack/react-table'
import { FilePenLineIcon, SearchIcon, TrashIcon } from 'lucide-react'
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
import { DataTableActionCell } from '@/components/organisms/data-table/data-table-action-cell'
import { useDataTable } from '@/components/organisms/data-table/lib'

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
  },
  {
    id: 'action',
    size: 112,
    header: 'Action',
    cell: () => (
      <DataTableActionCell
        menus={[
          {
            id: 'search',
            icon: <SearchIcon />,
            label: 'View',
            type: 'event',
            onClick: () => {
              console.log('Clicked ...')
            }
          },
          {
            id: 'update',
            icon: <FilePenLineIcon />,
            label: 'Update',
            type: 'event',
            onClick: () => {
              console.log('Clicked ...')
            }
          },
          {
            id: 'delete',
            icon: <TrashIcon />,
            label: 'Delete',
            type: 'event',
            variant: 'destructive',
            onClick: () => {
              console.log('Clicked ...')
            }
          }
        ]}
      />
    )
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

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
