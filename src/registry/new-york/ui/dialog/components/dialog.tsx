import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type { ComponentProps, HTMLAttributes } from 'react'
import { cn } from '@/utils/ui'

// Dialog
export const Dialog = ({ ...props }: ComponentProps<typeof Root>) => {
  // Template
  return <Root data-slot='dialog' {...props} />
}

// Dialog trigger
export const DialogTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  // Template
  return <Trigger data-slot='dialog-trigger' {...props} />
}

// Dialog portal
export const DialogPortal = ({ ...props }: ComponentProps<typeof Portal>) => {
  // Template
  return <Portal data-slot='dialog-portal' {...props} />
}

// Dialog close
export const DialogClose = ({ ...props }: ComponentProps<typeof Close>) => {
  // Template
  return <Close data-slot='dialog-close' {...props} />
}

// Dialog overlay
export const DialogOverlay = ({ className, ...props }: ComponentProps<typeof Overlay>) => {
  // Template
  return (
    <Overlay
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot='dialog-overlay'
      {...props}
    />
  )
}

// Dialog main content
export const DialogScrollableContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  // Template
  return (
    <div
      className={cn('-m-2 overflow-y-auto overflow-x-hidden p-2', className)}
      data-slot='dialog-scrollable-content'
      {...props}
    >
      {children}
    </div>
  )
}

// Dialog content
export const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof Content> & {
  showCloseButton?: boolean
}) => {
  // Template
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <Content
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 has-[div[data-slot=dialog-scrollable-content]]:grid-rows-[auto_1fr_auto] data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        data-slot='dialog-content'
        {...props}
      >
        {children}
        {showCloseButton && (
          <Close
            className="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            data-slot='dialog-close'
          >
            <XIcon />
            <span className='sr-only'>Close</span>
          </Close>
        )}
      </Content>
    </DialogPortal>
  )
}

// Dialog header
export const DialogHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      data-slot='dialog-header'
      {...props}
    />
  )
}

// Dialog footer
export const DialogFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      data-slot='dialog-footer'
      {...props}
    />
  )
}

// Dialog title
export const DialogTitle = ({ className, ...props }: ComponentProps<typeof Title>) => {
  // Template
  return <Title className={cn('font-semibold text-lg leading-none', className)} data-slot='dialog-title' {...props} />
}

// Dialog description
export const DialogDescription = ({ className, ...props }: ComponentProps<typeof Description>) => {
  // Template
  return (
    <Description className={cn('text-muted-foreground text-sm', className)} data-slot='dialog-description' {...props} />
  )
}
