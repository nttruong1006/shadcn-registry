import { useCurrentEditor } from '@tiptap/react'
import { BaselineIcon, CheckIcon, ChevronDownIcon, CircleSlashIcon } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/atoms/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'

const ColorPickerButton = lazy(() => import('./color-picker-button'))

const colors: string[] = [
  'oklch(0.27 0.01 34)',
  'oklch(0.27 0.01 286)',
  'oklch(0.28 0.04 260)',
  'oklch(0.44 0.16 27)',
  'oklch(0.47 0.14 37)',
  'oklch(0.47 0.12 46)',
  'oklch(0.48 0.1 62)',
  'oklch(0.45 0.11 131)',
  'oklch(0.45 0.11 151)',
  'oklch(0.43 0.09 167)',
  'oklch(0.44 0.07 188)',
  'oklch(0.45 0.08 224)',
  'oklch(0.44 0.1 241)',
  'oklch(0.42 0.18 266)',
  'oklch(0.4 0.18 277)',
  'oklch(0.43 0.21 293)',
  'oklch(0.44 0.2 304)',
  'oklch(0.45 0.19 325)',
  'oklch(0.46 0.17 4)',
  'oklch(0.45 0.17 14)'
]

export default function TextColorButton() {
  const { editor } = useCurrentEditor()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  function setColor(color: string) {
    setSelectedColor(color)
    editor?.chain().focus().setColor(color).run()
  }

  // function changeColorFromPicker(color: ColorInstance) {
  //   setSelectedColor(null)
  //   editor?.chain().setColor(color.hex()).run()
  // }

  function clearColor() {
    setSelectedColor(null)
    editor?.chain().focus().unsetColor().run()
  }

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button className='gap-1' variant='ghost'>
                  <BaselineIcon />
                  <ChevronDownIcon />
                </Button>
              }
            />
          }
        />
        <TooltipContent>Text color</TooltipContent>
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
            <ColorPickerButton
            // onValueChange={changeColorFromPicker}
            />
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
