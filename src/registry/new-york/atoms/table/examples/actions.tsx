import { MoreHorizontalIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/atoms/table'

export function TableActions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell className='text-right'>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className='size-8' size='icon' variant='ghost'>
                    <MoreHorizontalIcon />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell className='text-right'>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className='size-8' size='icon' variant='ghost'>
                    <MoreHorizontalIcon />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell className='text-right'>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className='size-8' size='icon' variant='ghost'>
                    <MoreHorizontalIcon />
                    <span className='sr-only'>Open menu</span>
                  </Button>
                }
              />
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
