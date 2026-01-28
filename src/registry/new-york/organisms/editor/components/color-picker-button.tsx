import { PaletteIcon } from 'lucide-react'
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  type ColorPickerProps,
  ColorPickerSelection
} from '@/registry/new-york/molecules/color-picker/components/color-picker'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover/components/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/registry/new-york/ui/tooltip/components/tooltip'

// Component
const ColorPickerButton = (props: ColorPickerProps) => {
  // Template
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button size='icon' variant='outline'>
              <PaletteIcon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>Pick color</TooltipContent>
      </Tooltip>

      <PopoverContent className='w-sm'>
        <ColorPicker {...props}>
          <ColorPickerSelection />
          <div className='flex items-center gap-2'>
            <ColorPickerEyeDropper />
            <div className='grow space-y-1'>
              <ColorPickerHue />
              <ColorPickerAlpha />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ColorPickerFormat />
            <ColorPickerOutput />
          </div>
        </ColorPicker>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPickerButton
