import { useEditorState } from '@tiptap/react'
import type { ColorInstance } from 'color'
import { CheckIcon, ChevronDownIcon, CircleSlashIcon, HighlighterIcon } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/atoms/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import { useInternalEditor } from './lib'

const ColorPickerButton = lazy(() => import('./color-picker-button'))

const colors: string[] = [
  'oklch(0.72 0.01 56)',
  'oklch(0.71 0.01 286)',
  'oklch(0.71 0.04 257)',
  'oklch(0.71 0.17 22)',
  'oklch(0.76 0.16 56)',
  'oklch(0.84 0.16 84)',
  'oklch(0.86 0.17 92)',
  'oklch(0.85 0.21 129)',
  'oklch(0.8 0.18 152)',
  'oklch(0.77 0.15 163)',
  'oklch(0.78 0.13 182)',
  'oklch(0.8 0.13 212)',
  'oklch(0.75 0.14 233)',
  'oklch(0.71 0.14 255)',
  'oklch(0.68 0.16 277)',
  'oklch(0.71 0.16 294)',
  'oklch(0.72 0.18 306)',
  'oklch(0.75 0.21 322)',
  'oklch(0.73 0.18 350)',
  'oklch(0.72 0.17 13)'
]

export default function HighlightButton() {
  const editor = useInternalEditor()
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isEditable: editor.isEditable && editor.can().toggleHighlight()
      }
    }
  })

  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const setColor = (color: string) => {
    setSelectedColor(color)
    editor.chain().focus().setHighlight({ color }).run()
  }

  const changeColor = (color: ColorInstance) => {
    setSelectedColor(null)
    editor.chain().setHighlight({ color: color.hex() }).run()
  }

  const clearColor = () => {
    setSelectedColor(null)
    editor.chain().focus().unsetHighlight().run()
  }

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button className='gap-1' disabled={!editorState.isEditable} variant='ghost'>
                  <HighlighterIcon />
                  <ChevronDownIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Highlight</TooltipContent>
      </Tooltip>

      <PopoverContent className='space-y-2'>
        <div className='grid grid-cols-5 gap-2'>
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => setColor(color)}
              size='icon'
              style={{
                backgroundColor: color
              }}
            >
              {selectedColor === color && <CheckIcon className='text-background' />}
            </Button>
          ))}
        </div>

        <div className='flex justify-end gap-2'>
          <Suspense fallback={<Button className='animate-pulse bg-muted' size='icon' variant='outline' />}>
            <ColorPickerButton onValueChange={changeColor} />
          </Suspense>

          <Tooltip>
            <TooltipTrigger
              render={
                <Button onClick={clearColor} size='icon' variant='outline'>
                  <CircleSlashIcon />
                </Button>
              }
            />
            <TooltipContent>Clear color</TooltipContent>
          </Tooltip>
        </div>
      </PopoverContent>
    </Popover>
  )
}
