import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/atoms/empty'

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <FolderCodeIcon />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className='flex-row justify-center gap-2'>
        <Button>Create Project</Button>
        <Button variant='outline'>Import Project</Button>
      </EmptyContent>
      <Button
        className='text-muted-foreground'
        nativeButton={false}
        render={
          <a href='/'>
            Learn More <ArrowUpRightIcon />
          </a>
        }
        size='sm'
        variant='link'
      />
    </Empty>
  )
}
