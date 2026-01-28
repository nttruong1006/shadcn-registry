import { Label } from '@/registry/new-york/ui/label/components/label'
import { Switch } from '@/registry/new-york/ui/switch/components/switch'

// Component
export function SwitchDemo() {
  // Template
  return (
    <div className='flex items-center space-x-2'>
      <Switch id='airplane-mode' />
      <Label htmlFor='airplane-mode'>Airplane Mode</Label>
    </div>
  )
}
