import { EllipsisVertical } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { Button } from '@/components/atoms/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'

interface BaseMenu {
  id: string
  icon?: ReactNode
  label?: ReactNode
}
interface LinkMenu extends BaseMenu {
  type: 'link'
  link: string
}

interface EventMenu extends BaseMenu {
  type: 'event'
  onClick: () => void
}

interface SlotMenu extends BaseMenu {
  type: 'slot'
  slot: ReactNode
}

type Menu = LinkMenu | EventMenu | SlotMenu

export function DataTableActionCell({ menus, loading }: { menus: Menu[]; loading?: boolean }) {
  if (!menus.length) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button loading={loading} size='icon' variant='ghost'>
            <EllipsisVertical className='size-4' />
          </Button>
        }
      />

      <DropdownMenuContent>
        {menus.map((menu) => {
          switch (menu.type) {
            case 'slot':
              return <Fragment key={menu.id}>{menu.slot}</Fragment>

            case 'link':
              return (
                <DropdownMenuItem
                  key={menu.id}
                  render={
                    <a href={menu.link}>
                      {menu.icon}
                      {menu.label}
                    </a>
                  }
                />
              )

            case 'event':
              return (
                <DropdownMenuItem key={menu.id} onClick={menu.onClick}>
                  {menu.icon}
                  {menu.label}
                </DropdownMenuItem>
              )

            default:
              return null
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
