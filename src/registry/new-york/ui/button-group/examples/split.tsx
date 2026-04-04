import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/atoms/button-group'

// Component
export function ButtonGroupSplit() {
  // Template
  return (
    <ButtonGroup>
      <Button variant='secondary'>Button</Button>
      <ButtonGroupSeparator />
      <Button size='icon' variant='secondary'>
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}
