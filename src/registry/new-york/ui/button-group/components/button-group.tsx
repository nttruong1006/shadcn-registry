import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { Separator } from '@/registry/new-york/ui/separator/components/separator'
import { cn } from '@/utils/ui'

// Button group
export const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none'
      }
    },
    defaultVariants: {
      orientation: 'horizontal'
    }
  }
)

export const ButtonGroup = ({
  className,
  orientation,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) => {
  // Template
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot='button-group'
      {...props}
    />
  )
}

export const ButtonGroupText = ({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & {
  asChild?: boolean
}) => {
  const Component = asChild ? Slot : 'div'

  // Template
  return (
    <Component
      className={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

export const ButtonGroupSeparator = ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<typeof Separator>) => {
  // Template
  return (
    <Separator
      className={cn('relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto', className)}
      data-slot='button-group-separator'
      orientation={orientation}
      {...props}
    />
  )
}
