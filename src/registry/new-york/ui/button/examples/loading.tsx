import { GitBranchIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'

// Component
export const ButtonLoading = () => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-2 md:flex-row'>
      <Button isLoading>Button</Button>

      <Button isLoading>
        <GitBranchIcon />
        <span>Button</span>
      </Button>

      <Button isLoading size='icon'>
        <GitBranchIcon />
      </Button>
    </div>
  )
}
