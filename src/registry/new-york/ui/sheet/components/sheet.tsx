import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Sheet
export const Sheet = ({ ...props }: ComponentProps<typeof Root>) => {
  // Template
  return <Root data-slot='sheet' {...props} />
}

// Sheet trigger
export const SheetTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  // Template
  return <Trigger data-slot='sheet-trigger' {...props} />
}

// Sheet close
export const SheetClose = ({ ...props }: ComponentProps<typeof Close>) => {
  // Template
  return <Close data-slot='sheet-close' {...props} />
}

// Sheet portal
export const SheetPortal = ({ ...props }: ComponentProps<typeof Portal>) => {
  // Template
  return <Portal data-slot='sheet-portal' {...props} />
}

// Sheet overlay
export const SheetOverlay = ({ className, ...props }: ComponentProps<typeof Overlay>) => {
  // Template
  return (
    <Overlay
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot='sheet-overlay'
      {...props}
    />
  )
}

// Sheet content
export const SheetContent = ({
  className,
  children,
  side = 'right',
  ...props
}: ComponentProps<typeof Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  // Template
  return (
    <SheetPortal>
      <SheetOverlay />
      <Content
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
          className
        )}
        data-slot='sheet-content'
        {...props}
      >
        {children}
        <Close className='absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </Close>
      </Content>
    </SheetPortal>
  )
}

// Sheet header
export const SheetHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('flex flex-col gap-1.5 p-4', className)} data-slot='sheet-header' {...props} />
}

// Sheet footer
export const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} data-slot='sheet-footer' {...props} />
}

// Sheet title
export const SheetTitle = ({ className, ...props }: ComponentProps<typeof Title>) => {
  // Template
  return <Title className={cn('font-semibold text-foreground', className)} data-slot='sheet-title' {...props} />
}

// Sheet description
export const SheetDescription = ({ className, ...props }: ComponentProps<typeof Description>) => {
  // Template
  return (
    <Description className={cn('text-muted-foreground text-sm', className)} data-slot='sheet-description' {...props} />
  )
}
