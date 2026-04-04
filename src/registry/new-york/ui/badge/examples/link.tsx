import { ArrowUpRightIcon } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'

// Component
export function BadgeAsLink() {
  // Template
  return (
    <Badge asChild>
      <a href='#link'>
        Open Link <ArrowUpRightIcon data-icon='inline-end' />
      </a>
    </Badge>
  )
}
