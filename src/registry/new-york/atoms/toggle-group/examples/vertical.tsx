import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/atoms/toggle-group'

export function ToggleGroupVertical() {
  return (
    <ToggleGroup defaultValue={['bold', 'italic']} multiple orientation='vertical' spacing={1}>
      <ToggleGroupItem aria-label='Toggle bold' value='bold'>
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle italic' value='italic'>
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle underline' value='underline'>
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
