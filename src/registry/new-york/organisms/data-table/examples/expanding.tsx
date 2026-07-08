import { type ColumnDef, getExpandedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
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
import { cn } from '@/utils/ui'

type Row = {
  id: string
  firstName: string
  lastName: string
  age: number
} & {
  subRows: Row[]
}

const COLUMNS: ColumnDef<Row>[] = [
  {
    cell: ({ row }) => {
      if (row.getCanExpand()) {
        const style = {
          marginLeft: `${row.depth * 16}px`
        }

        return (
          <Button
            className={cn('gap-1 p-0 [&>svg]:transition-transform', {
              '[&>svg]:rotate-90': row.getIsExpanded()
            })}
            onClick={row.getToggleExpandedHandler()}
            size='icon'
            style={style}
            variant='ghost'
          >
            <ChevronRight />
          </Button>
        )
      }

      return null
    },
    id: 'expanding',
    size: 64
  },
  {
    cell: ({ row }) => {
      const parentRowIndexes = row.getParentRows().map((parentRow) => parentRow.index + 1)
      const index = [...parentRowIndexes, row.index + 1].join('.')
      return index
    },
    header: 'No',
    id: 'no',
    size: 64
  },
  {
    accessorKey: 'firstName',
    cell: (info) => info.getValue(),
    header: 'First name',
    id: 'firstName',
    size: 112
  },
  {
    accessorKey: 'lastName',
    cell: (info) => info.getValue(),
    header: 'Last name',
    id: 'lastName',
    size: 112
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    id: 'age',
    size: 112
  }
]

const DATA: Row[] = [
  {
    age: 24,
    firstName: 'tanner',
    id: '1',
    lastName: 'linsley',
    subRows: [
      {
        age: 5,
        firstName: 'Jane',
        id: '1.1',
        lastName: 'test',
        subRows: [
          {
            age: 0,
            firstName: 'third',
            id: '1.1.1',
            lastName: 'child',
            subRows: []
          },
          {
            age: 0,
            firstName: 'test 1',
            id: '1.1.2',
            lastName: 'test 2',
            subRows: [
              {
                age: 0,
                firstName: 'test 3',
                id: '1.1.2.1',
                lastName: 'test 4',
                subRows: []
              },
              {
                age: 0,
                firstName: 'test 5',
                id: '1.1.2.2',
                lastName: 'test 6',
                subRows: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    age: 40,
    firstName: 'tandy',
    id: '2',
    lastName: 'miller',
    subRows: [{ age: 10, firstName: 'Jim', id: '2.1', lastName: 'test', subRows: [] }]
  },
  {
    age: 45,
    firstName: 'joe',
    id: '3',
    lastName: 'dirte',
    subRows: []
  }
]

export function DataTableExpanding() {
  const table = useDataTable({
    autoResetExpanded: false,
    // Not reset page automatically when expanding
    autoResetPageIndex: false,
    columns: COLUMNS,
    data: DATA,
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Need getSubRows for expanding
    getSubRows: (row) => row.subRows
  })

  return (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />

      <DialogContent className='w-7xl'>
        <DialogHeader>
          <DialogTitle>Data table</DialogTitle>
          <DialogDescription>Expanding</DialogDescription>
        </DialogHeader>

        <DialogScroll>
          <DataTable table={table} />
        </DialogScroll>
      </DialogContent>
    </Dialog>
  )
}
