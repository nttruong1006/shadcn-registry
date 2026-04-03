import { Avatar as AvatarPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Avatar
export function Avatar({
  className,
  size = 'default',
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: 'default' | 'sm' | 'lg'
}) {
  // Template
  return (
    <AvatarPrimitive.Root
      className={cn(
        'group/avatar relative flex size-8 shrink-0 select-none rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6',
        className
      )}
      data-size={size}
      data-slot='avatar'
      {...props}
    />
  )
}

// Avatar image
export function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  // Template
  return (
    <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} data-slot='avatar-image' {...props} />
  )
}

// Avatar fallback
export function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  // Template
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm group-data-[size=sm]/avatar:text-xs',
        className
      )}
      data-slot='avatar-fallback'
      {...props}
    />
  )
}

// Avatar badge
export function AvatarBadge({ className, ...props }: ComponentProps<'span'>) {
  // Template
  return (
    <span
      className={cn(
        'absolute right-0 bottom-0 z-10 inline-flex select-none items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        className
      )}
      data-slot='avatar-badge'
      {...props}
    />
  )
}

// Avatar group
export function AvatarGroup({ className, ...props }: ComponentProps<'div'>) {
  // Template
  return (
    <div
      className={cn(
        'group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        className
      )}
      data-slot='avatar-group'
      {...props}
    />
  )
}

// Avatar group count
export function AvatarGroupCount({ className, ...props }: ComponentProps<'div'>) {
  // Template
  return (
    <div
      className={cn(
        'relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3',
        className
      )}
      data-slot='avatar-group-count'
      {...props}
    />
  )
}
