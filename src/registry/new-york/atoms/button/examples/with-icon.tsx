import { GitBranchIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'

export function ButtonWithIcon() {
  return (
    <Button variant='outline'>
      <GitBranchIcon data-icon='inline-start' /> New Branch
    </Button>
  )
}
