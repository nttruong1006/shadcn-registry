import { SearchIcon } from 'lucide-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/registry/new-york/ui/empty/components/empty'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york/ui/input-group/components/input-group'
import { Kbd } from '@/registry/new-york/ui/kbd/components/kbd'

// Component
export const EmptyInputGroup = () => {
  // Template
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className='sm:w-3/4'>
          <InputGroupInput placeholder='Try searching for pages...' />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          <span>Need help?</span> {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
          <a href='#'>Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
