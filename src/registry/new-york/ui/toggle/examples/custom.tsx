import { BookmarkIcon } from 'lucide-react'
import { Toggle } from '@/registry/new-york/ui/toggle/components/toggle'

// Component
export const ToggleDemo = () => {
  // Template
  return (
    <Toggle
      className='data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500'
      variant='outline'
    >
      <BookmarkIcon />
      Bookmark
    </Toggle>
  )
}
