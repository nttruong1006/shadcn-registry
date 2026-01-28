import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york/ui/avatar/components/avatar'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/registry/new-york/ui/empty/components/empty'

// Component
export const EmptyAvatar = () => {
  // Template
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='default'>
          <Avatar className='size-12'>
            <AvatarImage className='grayscale' src='https://github.com/shadcn.png' />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm'>Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}
