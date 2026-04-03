import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { Button } from '@/components/atoms/button'
import { cn } from '@/utils/ui'

// Alert dialog
export function AlertDialog({ ...props }: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  // Template
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />
}

// Alert dialog trigger
export function AlertDialogTrigger({ ...props }: ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  // Template
  return <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
}

// Alert dialog portal
export function AlertDialogPortal({ ...props }: ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  // Template
  return <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
}

// Alert dialog overlay
export function AlertDialogOverlay({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  // Template
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'data-open:fade-in-0 data-closed:fade-out-0 fixed inset-0 z-50 bg-black/10 duration-100 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-xs',
        className
      )}
      {...props}
    />
  )
}

// Alert dialog content
export function AlertDialogContent({
  className,
  size = 'default',
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: 'default' | 'sm'
}) {
  // Template
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'group/alert-dialog-content data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground outline-none ring-1 ring-foreground/10 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-closed:animate-out data-open:animate-in data-[size=default]:sm:max-w-sm',
          className
        )}
        data-size={size}
        data-slot='alert-dialog-content'
        {...props}
      />
    </AlertDialogPortal>
  )
}

// Alert dialog header
export function AlertDialogHeader({ className, ...props }: ComponentProps<'div'>) {
  // Template
  return (
    <div
      className={cn(
        'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
        className
      )}
      data-slot='alert-dialog-header'
      {...props}
    />
  )
}

// Alert dialog footer
export function AlertDialogFooter({ className, ...props }: ComponentProps<'div'>) {
  // Template
  return (
    <div
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
        className
      )}
      data-slot='alert-dialog-footer'
      {...props}
    />
  )
}

// Alert dialog media
export function AlertDialogMedia({ className, ...props }: ComponentProps<'div'>) {
  // Template
  return (
    <div
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      data-slot='alert-dialog-media'
      {...props}
    />
  )
}

// Alert dialog title
export function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  // Template
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        'cn-font-heading font-medium text-base sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        className
      )}
      data-slot='alert-dialog-title'
      {...props}
    />
  )
}

// Alert dialog description
export function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  // Template
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        'text-balance text-muted-foreground text-sm md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className
      )}
      data-slot='alert-dialog-description'
      {...props}
    />
  )
}

// Alert dialog action
export function AlertDialogAction({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Action> & Pick<ComponentProps<typeof Button>, 'variant' | 'size'>) {
  // Template
  return (
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Action className={cn(className)} data-slot='alert-dialog-action' {...props} />
    </Button>
  )
}

// Alert dialog cancel
export function AlertDialogCancel({
  className,
  variant = 'outline',
  size = 'default',
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Cancel> & Pick<ComponentProps<typeof Button>, 'variant' | 'size'>) {
  // Template
  return (
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Cancel className={cn(className)} data-slot='alert-dialog-cancel' {...props} />
    </Button>
  )
}
