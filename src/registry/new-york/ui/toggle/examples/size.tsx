import { ItalicIcon } from 'lucide-react'
import { Toggle } from '@/registry/new-york/ui/toggle/components/toggle'

// Component
export const ToggleSize = () => {
  // Template
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Toggle size='sm' variant='outline'>
        <ItalicIcon />
        <span>Small</span>
      </Toggle>

      <Toggle variant='outline'>
        <ItalicIcon />
        <span>Default</span>
      </Toggle>

      <Toggle size='lg' variant='outline'>
        <ItalicIcon />
        <span>Large</span>
      </Toggle>
    </div>
  )
}
