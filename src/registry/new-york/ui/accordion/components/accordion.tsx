import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Accordion
export const Accordion = (props: ComponentProps<typeof Root>) => {
  // Template
  return <Root data-slot='accordion' {...props} />
}

// Accordion item
export const AccordionItem = ({ className, ...props }: ComponentProps<typeof Item>) => {
  // Template
  return <Item className={cn('border-b last:border-b-0', className)} data-slot='accordion-item' {...props} />
}

// Accordion trigger
export const AccordionTrigger = ({ className, children, ...props }: ComponentProps<typeof Trigger>) => {
  // Template
  return (
    <Header className='flex'>
      <Trigger
        className={cn(
          'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        data-slot='accordion-trigger'
        {...props}
      >
        {children}
        <ChevronDownIcon className='h-4 w-4 shrink-0 transition-transform duration-200' />
      </Trigger>
    </Header>
  )
}

// Accordion content
export const AccordionContent = ({ className, children, ...props }: ComponentProps<typeof Content>) => {
  // Template
  return (
    <Content
      className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      data-slot='accordion-content'
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </Content>
  )
}
