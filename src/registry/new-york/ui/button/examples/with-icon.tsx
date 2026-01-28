import { GitBranchIcon } from 'lucide-react'
import { Button } from '@/registry/new-york/ui/button/components/button'

// Component
export const ButtonWithIcon = () => {
  // Template
  return (
    <Button size='sm' variant='outline'>
      <GitBranchIcon />
      <span>New Branch</span>
    </Button>
  )
}
