import { PlusIcon } from 'lucide-react'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'

// Component
export function AvatarBadgeIconExample() {
  // Template
  return (
    <Avatar className='grayscale'>
      <AvatarImage alt='@pranathip' src='https://github.com/pranathip.png' />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  )
}
