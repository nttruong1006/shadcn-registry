import { Bell, RefreshCcwIcon } from 'lucide-react'
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
export const EmptyBackground = () => {
  // Template
  return (
    <Empty className='h-full bg-linear-to-b from-30% from-muted/50 to-background'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Bell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up. New notifications will appear here.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm' variant='outline'>
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
