import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { ButtonGroup } from '@/components/atoms/button-group'
import { Input } from '@/components/atoms/input'

// Component
export function ButtonGroupInput() {
  // Template
  return (
    <ButtonGroup>
      <Input placeholder='Search...' />
      <Button aria-label='Search' variant='outline'>
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
