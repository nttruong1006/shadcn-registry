import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger
} from '@radix-ui/react-alert-dialog'
import type { ComponentProps } from 'react'
import { buttonVariants } from '@/registry/new-york/ui/button/components/button'
import { cn } from '@/utils/ui'

// Alert dialog
export const AlertDialog = (props: ComponentProps<typeof Root>) => {
  // Template
  return <Root data-slot='alert-dialog' {...props} />
}

// Alert dialog trigger
export const AlertDialogTrigger = (props: ComponentProps<typeof Trigger>) => {
  // Template
  return <Trigger data-slot='alert-dialog-trigger' {...props} />
}

// AlertDialogPortal
export const AlertDialogPortal = (props: ComponentProps<typeof Portal>) => {
  // Template
  return <Portal data-slot='alert-dialog-portal' {...props} />
}

// Alert dialog overlay
export const AlertDialogOverlay = ({ className, ...props }: ComponentProps<typeof Overlay>) => {
  // Template
  return (
    <Overlay
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot='alert-dialog-overlay'
      {...props}
    />
  )
}

// Alert dialog content
export const AlertDialogContent = ({ className, ...props }: ComponentProps<typeof Content>) => {
  // Template
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Content
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg',
          className
        )}
        data-slot='alert-dialog-content'
        {...props}
      />
    </AlertDialogPortal>
  )
}

// Alert dialog header
export const AlertDialogHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      data-slot='alert-dialog-header'
      {...props}
    />
  )
}

// Alert dialog footer
export const AlertDialogFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      data-slot='alert-dialog-footer'
      {...props}
    />
  )
}

// Alert dialog title
export const AlertDialogTitle = ({ className, ...props }: ComponentProps<typeof Title>) => {
  // Template
  return <Title className={cn('font-semibold text-lg', className)} data-slot='alert-dialog-title' {...props} />
}

// Alert dialog description
export const AlertDialogDescription = ({ className, ...props }: ComponentProps<typeof Description>) => {
  // Template
  return (
    <Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot='alert-dialog-description'
      {...props}
    />
  )
}

// Alert dialog action
export const AlertDialogAction = ({ className, ...props }: ComponentProps<typeof Action>) => {
  // Template
  return <Action className={cn(buttonVariants(), className)} {...props} />
}

// Alert dialog cancel
export const AlertDialogCancel = ({ className, ...props }: ComponentProps<typeof Cancel>) => {
  // Template
  return <Cancel className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
}
