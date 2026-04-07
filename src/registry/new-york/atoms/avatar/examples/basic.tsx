import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage alt='@shadcn' className='grayscale' src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
