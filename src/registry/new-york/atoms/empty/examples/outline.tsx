import { CloudIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/atoms/empty'

export function EmptyOutline() {
  return (
    <Empty className='border border-dashed'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <CloudIcon />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size='sm' variant='outline'>
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
