import {
  Anchor,
  Content,
  Portal,
  type PopoverAnchorProps as ReactPopoverAnchorProps,
  type PopoverContentProps as ReactPopoverContentProps,
  type PopoverProps as ReactPopoverProps,
  type PopoverTriggerProps as ReactPopoverTriggerProps,
  Root,
  Trigger
} from '@radix-ui/react-popover'
import { cn } from '@/utils/ui'

// Popover
export type PopoverProps = ReactPopoverProps
export const Popover = ({ ...props }: PopoverProps) => {
  // Template
  return <Root data-slot='popover' {...props} />
}

// Popover trigger
export type PopoverTriggerProps = ReactPopoverTriggerProps
export const PopoverTrigger = ({ ...props }: PopoverTriggerProps) => {
  // Template
  return <Trigger data-slot='popover-trigger' {...props} />
}

// Popover content
export type PopoverContentProps = ReactPopoverContentProps
export const PopoverContent = ({ className, align = 'center', sideOffset = 4, ...props }: PopoverContentProps) => {
  // Template
  return (
    <Portal>
      <Content
        align={align}
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        data-slot='popover-content'
        sideOffset={sideOffset}
        {...props}
      />
    </Portal>
  )
}

// Popover anchor
export type PopoverAnchorProps = ReactPopoverAnchorProps
export const PopoverAnchor = ({ ...props }: PopoverAnchorProps) => {
  // Template
  return <Anchor data-slot='popover-anchor' {...props} />
}
