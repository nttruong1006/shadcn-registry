import { SearchIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york/ui/input-group/components/input-group'
import { Kbd } from '@/registry/new-york/ui/kbd/components/kbd'

// Component
export const KbdInputGroup = () => {
  // Template
  return (
    <div className='flex w-full max-w-xs flex-col gap-6'>
      <InputGroup>
        <InputGroupInput placeholder='Search...' />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
