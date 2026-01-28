import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Tooltip provider
export const TooltipProvider = ({ delayDuration = 300, ...props }: ComponentProps<typeof Provider>) => {
  // Template
  return <Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />
}

// Tooltip
export const Tooltip = ({ ...props }: ComponentProps<typeof Root>) => {
  // Template
  return (
    <TooltipProvider>
      <Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  )
}

// Tooltip trigger
export const TooltipTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  // Template
  return <Trigger data-slot='tooltip-trigger' {...props} />
}

// Tooltip content
export const TooltipContent = ({ className, sideOffset = 0, children, ...props }: ComponentProps<typeof Content>) => {
  // Template
  return (
    <Portal>
      <Content
        className={cn(
          'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-foreground px-3 py-1.5 text-background text-xs data-[state=closed]:animate-out',
          className
        )}
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <Arrow className='z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-xs bg-foreground fill-foreground' />
      </Content>
    </Portal>
  )
}
