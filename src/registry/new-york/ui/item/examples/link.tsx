import { ChevronRightIcon, ExternalLinkIcon } from 'lucide-react'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/registry/new-york/ui/item/components/item'

// Component
export const ItemLink = () => {
  // Template
  return (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <Item asChild>
        {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
        <a href='#'>
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>Learn how to get started with our components.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className='size-4' />
          </ItemActions>
        </a>
      </Item>
      <Item asChild variant='outline'>
        {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
        <a href='#' rel='noopener noreferrer' target='_blank'>
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon className='size-4' />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
