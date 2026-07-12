import { BookmarkIcon } from 'lucide-react'
import { Toggle } from '@/components/atoms/toggle'

export function ToggleDemo() {
  return (
    <Toggle aria-label='Toggle bookmark' variant='outline'>
      <BookmarkIcon className='group-aria-pressed/toggle:fill-foreground' />
      Bookmark
    </Toggle>
  )
}
