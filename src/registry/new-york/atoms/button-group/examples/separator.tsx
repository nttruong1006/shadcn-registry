import { Button } from '@/components/atoms/button'
import { ButtonGroup, ButtonGroupSeparator } from '@/components/atoms/button-group'

export function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button size='sm' variant='secondary'>
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button size='sm' variant='secondary'>
        Paste
      </Button>
    </ButtonGroup>
  )
}
