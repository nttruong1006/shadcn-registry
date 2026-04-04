import { Badge } from '@/components/atoms/badge'

// Component
export function BadgeVariants() {
  // Template
  return (
    <div className='flex flex-wrap gap-2'>
      <Badge>Default</Badge>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='destructive'>Destructive</Badge>
      <Badge variant='outline'>Outline</Badge>
      <Badge variant='ghost'>Ghost</Badge>
    </div>
  )
}
