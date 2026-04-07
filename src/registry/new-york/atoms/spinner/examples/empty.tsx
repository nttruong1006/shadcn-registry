import { Button } from '@/components/atoms/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/atoms/empty'
import { Spinner } from '@/components/atoms/spinner'

export function SpinnerEmpty() {
  return (
    <Empty className='w-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>Please wait while we process your request. Do not refresh the page.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm' variant='outline'>
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
