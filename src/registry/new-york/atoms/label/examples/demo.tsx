import { Checkbox } from '@/components/atoms/checkbox'
import { Label } from '@/components/atoms/label'

export function LabelDemo() {
  return (
    <div className='flex gap-2'>
      <Checkbox id='terms' />
      <Label htmlFor='terms'>Accept terms and conditions</Label>
    </div>
  )
}
