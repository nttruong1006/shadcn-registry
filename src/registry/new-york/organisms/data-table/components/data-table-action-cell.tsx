import { EllipsisVertical } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu/components/dropdown-menu'

// Component
export const DataTableActionCell = ({
  menus,
  isLoading
}: {
  menus: Array<{
    id: string
    icon?: React.ReactNode
    label?: React.ReactNode
    slot?: React.ReactNode
    link?: string
    onClick?: () => void
  }>
  isLoading?: boolean
}) => {
  // Template
  if (menus.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button isLoading={isLoading} size='icon' variant='ghost'>
          <EllipsisVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {menus.map((menu) => {
          if (menu.slot) {
            return <Fragment key={menu.id}>{menu.slot}</Fragment>
          }

          if (menu.link) {
            return (
              <DropdownMenuItem asChild key={menu.id}>
                <a href={menu.link}>
                  {menu.icon}
                  {menu.label}
                </a>
              </DropdownMenuItem>
            )
          }

          return (
            <DropdownMenuItem key={menu.id} onClick={menu.onClick}>
              {menu.icon}
              {menu.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
