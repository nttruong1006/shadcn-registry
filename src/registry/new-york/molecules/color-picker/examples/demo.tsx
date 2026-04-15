import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection
} from '@/components/molecules/color-picker'

export function ColorPickerDemo() {
  return (
    <ColorPicker className='w-sm rounded-md border bg-background p-4 shadow-sm'>
      <ColorPickerSelection />
      <div className='flex items-center gap-4'>
        <ColorPickerEyeDropper />
        <div className='grow space-y-2'>
          <ColorPickerHue />
          <ColorPickerAlpha />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <ColorPickerFormat />
        <ColorPickerOutput />
      </div>
    </ColorPicker>
  )
}
