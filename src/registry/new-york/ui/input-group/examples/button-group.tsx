import { Link2Icon } from 'lucide-react'
import { ButtonGroup, ButtonGroupText } from '@/registry/new-york/ui/button-group/components/button-group'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york/ui/input-group/components/input-group'
import { Label } from '@/registry/new-york/ui/label/components/label'

// Component
export const InputGroupButtonGroup = () => {
  // Template
  return (
    <div className='grid w-full max-w-sm gap-6'>
      <ButtonGroup>
        <ButtonGroupText asChild>
          <Label htmlFor='url'>https://</Label>
        </ButtonGroupText>
        <InputGroup>
          <InputGroupInput id='url' />
          <InputGroupAddon align='inline-end'>
            <Link2Icon />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  )
}
