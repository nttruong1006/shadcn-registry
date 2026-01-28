import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle
} from '@/registry/new-york/ui/item/components/item'

// Component
export const ItemSizeDemo = () => {
  // Template
  return (
    <div className='flex w-full max-w-md flex-col gap-6'>
      <Item variant='outline'>
        <ItemContent>
          <ItemTitle>Default size</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size='sm' variant='outline'>
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item asChild size='sm' variant='outline'>
        {/** biome-ignore lint/a11y/useValidAnchor: ignore */}
        <a href='#'>
          <ItemMedia>
            <BadgeCheckIcon className='size-5' />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Small size (sm)</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className='size-4' />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
