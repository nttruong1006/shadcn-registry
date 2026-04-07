import { ChevronDownIcon, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/atoms/input-group'

export function InputGroupDropdown() {
  return (
    <div className='grid w-full max-w-sm gap-4'>
      <InputGroup>
        <InputGroupInput placeholder='Enter file name' />
        <InputGroupAddon align='inline-end'>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton aria-label='More' size='icon-xs' variant='ghost'>
                  <MoreHorizontal />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align='end' alignOffset={-4} sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder='Enter search query' />
        <InputGroupAddon align='inline-end'>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton className='pr-1.5! text-xs' variant='ghost'>
                  Search In... <ChevronDownIcon className='size-3' />
                </InputGroupButton>
              }
            />
            <DropdownMenuContent align='end' alignOffset={-4} sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
