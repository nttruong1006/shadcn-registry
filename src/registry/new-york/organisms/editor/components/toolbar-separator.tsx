import { memo } from 'react'
import { Separator } from '@/registry/new-york/ui/separator/components/separator'

// Component
const ToolbarSeparator = memo(() => {
  // Template
  return <Separator className='mx-2 h-9!' orientation='vertical' />
})

ToolbarSeparator.displayName = 'ToolbarSeparator'
export default ToolbarSeparator
