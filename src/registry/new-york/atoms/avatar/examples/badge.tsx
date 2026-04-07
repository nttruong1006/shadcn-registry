import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage alt='@shadcn' src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className='bg-green-600 dark:bg-green-800' />
    </Avatar>
  )
}
