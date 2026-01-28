import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york/ui/avatar/components/avatar'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/registry/new-york/ui/hover-card/components/hover-card'

// Component
export const HoverCardDemo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-80'>
        <div className='flex justify-between gap-4'>
          <Avatar>
            <AvatarImage src='https://github.com/vercel.png' />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h4 className='font-semibold text-sm'>@nextjs</h4>
            <p className='text-sm'>The React Framework – created and maintained by @vercel.</p>
            <div className='text-muted-foreground text-xs'>Joined December 2021</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
