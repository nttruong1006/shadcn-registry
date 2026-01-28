import { Checkbox } from '@/registry/new-york/ui/checkbox/components/checkbox'
import { Label } from '@/registry/new-york/ui/label/components/label'

// Component
export const LabelDemo = () => {
  // Template
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <Checkbox id='terms' />
        <Label htmlFor='terms'>Accept terms and conditions</Label>
      </div>
    </div>
  )
}
