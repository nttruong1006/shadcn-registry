import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Separator } from '@/registry/new-york/ui/separator/components/separator'
import { cn } from '@/utils/ui'

// Item group
export const ItemGroup = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('group/item-group flex flex-col', className)} data-slot='item-group' {...props} />
}

// Item separator
export const ItemSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => {
  // Template
  return <Separator className={cn('my-0', className)} data-slot='item-separator' orientation='horizontal' {...props} />
}

// Item
const itemVariants = cva(
  'group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50'
      },
      size: {
        default: 'gap-4 p-4',
        sm: 'gap-2.5 px-4 py-3'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export const Item = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof itemVariants> & { asChild?: boolean }) => {
  const Component = asChild ? Slot : 'div'

  // Template
  return (
    <Component
      className={cn(itemVariants({ variant, size, className }))}
      data-size={size}
      data-slot='item'
      data-variant={variant}
      {...props}
    />
  )
}

// Item media
const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export const ItemMedia = ({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) => {
  // Template
  return (
    <div
      className={cn(itemMediaVariants({ variant, className }))}
      data-slot='item-media'
      data-variant={variant}
      {...props}
    />
  )
}

// Item content
export const ItemContent = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', className)}
      data-slot='item-content'
      {...props}
    />
  )
}

// Item title
export const ItemTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex w-fit items-center gap-2 font-medium text-sm leading-snug', className)}
      data-slot='item-title'
      {...props}
    />
  )
}

// Item description
export const ItemDescription = ({ className, ...props }: ComponentProps<'p'>) => {
  // Template
  return (
    <p
      className={cn(
        'line-clamp-2 text-balance font-normal text-muted-foreground text-sm leading-normal',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      data-slot='item-description'
      {...props}
    />
  )
}

// Item actions
export const ItemActions = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('flex items-center gap-2', className)} data-slot='item-actions' {...props} />
}

// Item header
export const ItemHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex basis-full items-center justify-between gap-2', className)}
      data-slot='item-header'
      {...props}
    />
  )
}

// Item footer
export const ItemFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex basis-full items-center justify-between gap-2', className)}
      data-slot='item-footer'
      {...props}
    />
  )
}
