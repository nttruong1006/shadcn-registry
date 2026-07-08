import { useState } from 'react'
import { Checkbox } from '@/components/atoms/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table'

const tableData = [
  {
    email: 'sarah.chen@example.com',
    id: '1',
    name: 'Sarah Chen',
    role: 'Admin'
  },
  {
    email: 'marcus.rodriguez@example.com',
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'User'
  },
  {
    email: 'priya.patel@example.com',
    id: '3',
    name: 'Priya Patel',
    role: 'User'
  },
  {
    email: 'david.kim@example.com',
    id: '4',
    name: 'David Kim',
    role: 'Editor'
  }
]

export function CheckboxInTable() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(['1']))

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(tableData.map((row) => row.id)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  const selectAll = selectedRows.size === tableData.length
  const indeterminate = selectedRows.size > 0 && !selectAll

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-8'>
            <Checkbox
              checked={selectAll}
              id='select-all-checkbox'
              indeterminate={indeterminate}
              name='select-all-checkbox'
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row) => (
          <TableRow data-state={selectedRows.has(row.id) ? 'selected' : undefined} key={row.id}>
            <TableCell>
              <Checkbox
                checked={selectedRows.has(row.id)}
                id={`row-${row.id}-checkbox`}
                name={`row-${row.id}-checkbox`}
                onCheckedChange={(checked) => handleSelectRow(row.id, checked === true)}
              />
            </TableCell>
            <TableCell className='font-medium'>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
