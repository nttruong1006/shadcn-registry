import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'

// Component
export function AvatarBasic() {
  // Template
  return (
    <Avatar>
      <AvatarImage alt='@shadcn' className='grayscale' src='https://github.com/shadcn.png' />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
