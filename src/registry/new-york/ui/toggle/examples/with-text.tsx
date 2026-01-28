import { ItalicIcon } from 'lucide-react'
import { Toggle } from '@/registry/new-york/ui/toggle/components/toggle'

// Component
export const ToggleWithText = () => {
  // Template
  return (
    <Toggle>
      <ItalicIcon />
      <span>Italic</span>
    </Toggle>
  )
}
