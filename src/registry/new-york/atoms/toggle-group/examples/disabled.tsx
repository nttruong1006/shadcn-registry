import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/atoms/toggle-group'

export function ToggleGroupDisabled() {
  return (
    <ToggleGroup disabled>
      <ToggleGroupItem aria-label='Toggle bold' value='bold'>
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle italic' value='italic'>
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label='Toggle strikethrough' value='strikethrough'>
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
