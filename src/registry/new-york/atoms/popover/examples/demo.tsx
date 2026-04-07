import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/popover'

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant='outline'>Open popover</Button>} />
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Dimensions</h4>
            <p className='text-muted-foreground text-sm'>Set the dimensions for the layer.</p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='width'>Width</Label>
              <Input className='col-span-2 h-8' defaultValue='100%' id='width' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxWidth'>Max. width</Label>
              <Input className='col-span-2 h-8' defaultValue='300px' id='maxWidth' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='height'>Height</Label>
              <Input className='col-span-2 h-8' defaultValue='25px' id='height' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='maxHeight'>Max. height</Label>
              <Input className='col-span-2 h-8' defaultValue='none' id='maxHeight' />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
