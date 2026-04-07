import { Maximize2Icon, Minimize2Icon } from 'lucide-react'
import { useState } from 'react'
import TooltipButton from './tooltip-button'

const zoomInClassName =
  'bg-background fixed inset-0 z-50 p-6 [&_.tiptap]:max-h-[unset] [&_.tiptap]:min-h-[unset] [&_.tiptap]:h-full [&_.editor-content]:grow [&>div]:h-full [&>div]:flex [&>div]:flex-col [&_.editor-content]:overflow-auto'

export default function ZoomButton({ id }: { id: string }) {
  const [zoomed, setZoomed] = useState(false)

  function toggleZoom() {
    const newZoomed = !zoomed
    const editorElement = document.querySelector(`#editor-${id}`)
    editorElement?.classList[newZoomed ? 'add' : 'remove'](...zoomInClassName.split(' '))
    setZoomed(newZoomed)
  }

  return (
    <TooltipButton
      Icon={zoomed ? Minimize2Icon : Maximize2Icon}
      label={zoomed ? 'Zoom out' : 'Zoom in'}
      onClick={toggleZoom}
    />
  )
}
