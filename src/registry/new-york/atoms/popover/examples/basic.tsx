import { Button } from '@/components/atoms/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from '@/components/atoms/popover'

export function PopoverBasic() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className='w-fit' variant='outline'>
            Open Popover
          </Button>
        }
      />
      <PopoverContent align='start'>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}
