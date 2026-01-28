import { Maximize2Icon, Minimize2Icon } from 'lucide-react'
import { memo, useState } from 'react'
import TooltipButton from './tooltip-button'

const zoomInClassName =
  'bg-background fixed inset-0 z-50 p-6 [&_.tiptap]:max-h-[unset] [&_.tiptap]:min-h-[unset] [&_.tiptap]:h-full [&_.editor-content]:grow [&>div]:h-full [&>div]:flex [&>div]:flex-col [&_.editor-content]:overflow-auto'

// Component
const ZoomButton = memo<{
  id: string
}>(({ id }) => {
  // States
  const [isZoomed, setIsZoomed] = useState(false)

  // Methods
  const toggleZoom = () => {
    const newIsZoomed = !isZoomed
    const editorElement = document.querySelector(`#editor-${id}`)
    editorElement?.classList[newIsZoomed ? 'add' : 'remove'](...zoomInClassName.split(' '))
    setIsZoomed(newIsZoomed)
  }

  // Template
  return (
    <TooltipButton
      Icon={isZoomed ? Minimize2Icon : Maximize2Icon}
      label={isZoomed ? 'Zoom out' : 'Zoom in'}
      onClick={toggleZoom}
    />
  )
})

ZoomButton.displayName = 'ZoomButton'
export default ZoomButton
