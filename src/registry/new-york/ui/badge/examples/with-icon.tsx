import { BadgeCheck, BookmarkIcon } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'

// Component
export function BadgeWithIconLeft() {
  // Template
  return (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='secondary'>
        <BadgeCheck data-icon='inline-start' />
        Verified
      </Badge>
      <Badge variant='outline'>
        Bookmark
        <BookmarkIcon data-icon='inline-end' />
      </Badge>
    </div>
  )
}
