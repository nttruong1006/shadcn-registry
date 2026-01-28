import {
  ArchiveIcon,
  ArrowLeftIcon,
  CalendarPlusIcon,
  ClockIcon,
  ListFilterPlusIcon,
  MailCheckIcon,
  MoreHorizontalIcon,
  TagIcon,
  Trash2Icon
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { ButtonGroup } from '@/registry/new-york/ui/button-group/components/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu/components/dropdown-menu'

// Component
export const ButtonGroupDemo = () => {
  // States
  const [label, setLabel] = useState('personal')

  // Template
  return (
    <ButtonGroup>
      <ButtonGroup className='hidden sm:flex'>
        <Button aria-label='Go Back' size='icon' variant='outline'>
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant='outline'>Archive</Button>
        <Button variant='outline'>Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant='outline'>Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label='More Options' size='icon' variant='outline'>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-52'>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <MailCheckIcon />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArchiveIcon />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <ClockIcon />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CalendarPlusIcon />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ListFilterPlusIcon />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <TagIcon />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup onValueChange={setLabel} value={label}>
                    <DropdownMenuRadioItem value='personal'>Personal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='work'>Work</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='other'>Other</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant='destructive'>
                <Trash2Icon />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  )
}
