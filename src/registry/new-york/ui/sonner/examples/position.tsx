import { useState } from 'react'
import { type ToasterProps, toast } from 'sonner'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/registry/new-york/ui/select/components/select'

type Position = NonNullable<ToasterProps['position']>
const positions: Position[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center']

// Component
export const SonnerPosition = () => {
  // States
  const [position, setPosition] = useState<Position>('top-left')

  // Template
  return (
    <div className='flex items-center gap-2'>
      <Select onValueChange={(value) => setPosition(value as Position)} value={position}>
        <SelectTrigger className='w-xs'>
          <SelectValue placeholder='Position' />
        </SelectTrigger>
        <SelectContent>
          {positions.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() =>
          toast('Event has been created', {
            position
          })
        }
        variant='outline'
      >
        Show Toast
      </Button>
    </div>
  )
}
