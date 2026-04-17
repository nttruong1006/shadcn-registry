import { PaletteIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms/tooltip'
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  type ColorPickerProps,
  ColorPickerSelection
} from '@/components/molecules/color-picker'

export default function ColorPickerButton(props: ColorPickerProps) {
  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button size='icon' variant='outline'>
                  <PaletteIcon />
                </Button>
              }
            />
          }
        />
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
