import { ChevronDownIcon } from 'lucide-react'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Accordion
export function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  // Template
  return <AccordionPrimitive.Root className={cn('flex w-full flex-col', className)} data-slot='accordion' {...props} />
}

// Accordion item
export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  // Template
  return (
    <AccordionPrimitive.Item className={cn('not-last:border-b', className)} data-slot='accordion-item' {...props} />
  )
}

// Accordion trigger
export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  // Template
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        className={cn(
          'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground',
          className
        )}
        data-slot='accordion-trigger'
        {...props}
      >
        {children}
        <ChevronDownIcon
          className='pointer-events-none shrink-0 transition-transform group-aria-expanded/accordion-trigger:rotate-180'
          data-slot='accordion-trigger-icon'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Accordion content
export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  // Template
  return (
    <AccordionPrimitive.Content
      className='overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      data-slot='accordion-content'
      {...props}
    >
      <div
        className={cn(
          'h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
