import { Slot } from '@radix-ui/react-slot'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Breadcrumb
export const Breadcrumb = ({ ...props }: ComponentProps<'nav'>) => {
  // Template
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

// Breadcrumb list
export const BreadcrumbList = ({ className, ...props }: ComponentProps<'ol'>) => {
  // Template
  return (
    <ol
      className={cn(
        'wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5',
        className
      )}
      data-slot='breadcrumb-list'
      {...props}
    />
  )
}

// Breadcrumb item
export const BreadcrumbItem = ({ className, ...props }: ComponentProps<'li'>) => {
  // Template
  return <li className={cn('inline-flex items-center gap-1.5', className)} data-slot='breadcrumb-item' {...props} />
}

// Breadcrumb link
export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'a'

  // Template
  return (
    <Comp
      className={cn('cursor-pointer transition-colors hover:text-foreground', className)}
      data-slot='breadcrumb-link'
      {...props}
    />
  )
}

// Breadcrumb page
export const BreadcrumbPage = ({ className, ...props }: ComponentProps<'span'>) => {
  // Template
  return (
    <span
      aria-current='page'
      aria-disabled='true'
      className={cn('font-normal text-foreground', className)}
      data-slot='breadcrumb-page'
      {...props}
    />
  )
}

// Breadcrumb separator
export const BreadcrumbSeparator = ({ children, className, ...props }: ComponentProps<'li'>) => {
  // Template
  return (
    <li
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      data-slot='breadcrumb-separator'
      role='presentation'
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

// Breadcrumb ellipsis
export const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<'span'>) => {
  return (
    <span
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}
