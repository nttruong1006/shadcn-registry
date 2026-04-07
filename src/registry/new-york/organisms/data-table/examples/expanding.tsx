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
    id: 'expanding',
    size: 64,
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
    }
  },
  {
    id: 'no',
    header: 'No',
    size: 64,
    cell: ({ row }) => {
      const parentRowIndexes = row.getParentRows().map((parentRow) => parentRow.index + 1)
      const index = [...parentRowIndexes, row.index + 1].join('.')
      return index
    }
  },
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
    size: 112,
    cell: (info) => info.getValue()
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
    size: 112,
    cell: (info) => info.getValue()
  },
  {
    id: 'age',
    size: 112,
    accessorKey: 'age',
    header: () => 'Age'
  }
]

const DATA: Row[] = [
  {
    id: '1',
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    subRows: [
      {
        id: '1.1',
        firstName: 'Jane',
        lastName: 'test',
        age: 5,
        subRows: [
          {
            id: '1.1.1',
            firstName: 'third',
            lastName: 'child',
            age: 0,
            subRows: []
          },
          {
            id: '1.1.2',
            firstName: 'test 1',
            lastName: 'test 2',
            age: 0,
            subRows: [
              {
                id: '1.1.2.1',
                firstName: 'test 3',
                lastName: 'test 4',
                age: 0,
                subRows: []
              },
              {
                id: '1.1.2.2',
                firstName: 'test 5',
                lastName: 'test 6',
                age: 0,
                subRows: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    subRows: [{ id: '2.1', firstName: 'Jim', lastName: 'test', age: 10, subRows: [] }]
  },
  {
    id: '3',
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    subRows: []
  }
]

export function DataTableExpanding() {
  const table = useDataTable({
    columns: COLUMNS,
    data: DATA,
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // Need getSubRows for expanding
    getSubRows: (row) => row.subRows,
    autoResetExpanded: false,
    // Not reset page automatically when expanding
    autoResetPageIndex: false
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
