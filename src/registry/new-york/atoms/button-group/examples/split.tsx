import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/atoms/button-group'

export function ButtonGroupSplit() {
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
