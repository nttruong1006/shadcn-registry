import { GitBranchIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'

export function ButtonLoading() {
  return (
    <div className='flex gap-2'>
      <Button loading variant='outline'>
        Generating
      </Button>

      <Button loading size='icon-sm' variant='outline'>
        <GitBranchIcon />
      </Button>
    </div>
  )
}
