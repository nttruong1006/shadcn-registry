import { ChevronDownIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york/ui/avatar/components/avatar'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/registry/new-york/ui/dropdown-menu/components/dropdown-menu'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/registry/new-york/ui/item/components/item'

const PEOPLE = [
  {
    username: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    email: 'shadcn@vercel.com'
  },
  {
    username: 'maxleiter',
    avatar: 'https://github.com/maxleiter.png',
    email: 'maxleiter@vercel.com'
  },
  {
    username: 'evilrabbit',
    avatar: 'https://github.com/evilrabbit.png',
    email: 'evilrabbit@vercel.com'
  }
]

// Component
export const ItemDropdown = () => {
  // Template
  return (
    <div className='flex min-h-64 w-full max-w-md flex-col items-center gap-6'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='w-fit' size='sm' variant='outline'>
            Select <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-72'>
          {PEOPLE.map((person) => (
            <DropdownMenuItem className='p-0' key={person.username}>
              <Item className='w-full p-2' size='sm'>
                <ItemMedia>
                  <Avatar className='size-8'>
                    <AvatarImage className='grayscale' src={person.avatar} />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
