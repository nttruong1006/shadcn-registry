import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york/ui/toggle-group/components/toggle-group'

// Component
export const ToggleGroupSpacing = () => {
  // Template
  return (
    <ToggleGroup type='single'>
      <ToggleGroupItem aria-label='Toggle bold' value='bold'>
        <BoldIcon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle italic' value='italic'>
        <ItalicIcon className='h-4 w-4' />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
        <UnderlineIcon className='h-4 w-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
