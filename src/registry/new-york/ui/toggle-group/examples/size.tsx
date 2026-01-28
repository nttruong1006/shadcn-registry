import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york/ui/toggle-group/components/toggle-group'

// Component
export const ToggleGroupSize = () => {
  // Template
  return (
    <div className='space-y-4'>
      <ToggleGroup size='sm' type='multiple' variant='outline'>
        <ToggleGroupItem aria-label='Toggle bold' value='bold'>
          <BoldIcon className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle italic' value='italic'>
          <ItalicIcon className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
          <UnderlineIcon className='h-4 w-4' />
          <span>Small</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup type='multiple' variant='outline'>
        <ToggleGroupItem aria-label='Toggle bold' value='bold'>
          <BoldIcon className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle italic' value='italic'>
          <ItalicIcon className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
          <UnderlineIcon className='h-4 w-4' />
          <span>Default</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup size='lg' type='multiple' variant='outline'>
        <ToggleGroupItem aria-label='Toggle bold' value='bold'>
          <BoldIcon className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle italic' value='italic'>
          <ItalicIcon className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
        <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
          <UnderlineIcon className='h-4 w-4' />
          <span>Large</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
