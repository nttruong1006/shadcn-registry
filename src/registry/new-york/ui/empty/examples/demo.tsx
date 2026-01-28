import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react'
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
export const EmptyDemo = () => {
  // Template
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
      <EmptyContent>
        <div className='flex gap-2'>
          <Button>Create Project</Button>
          <Button variant='outline'>Import Project</Button>
        </div>

        <Button asChild className='text-muted-foreground' size='sm' variant='link'>
          {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
          <a href='#'>
            <span>Learn More</span>
            <ArrowUpRightIcon />
          </a>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
