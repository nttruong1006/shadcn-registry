import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

export function Breadcrumb(props: ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

export function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      className={cn('wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground sm:gap-2.5', className)}
      data-slot='breadcrumb-list'
      {...props}
    />
  )
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li className={cn('inline-flex items-center gap-1.5', className)} data-slot='breadcrumb-item' {...props} />
}

export function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn('transition-colors hover:text-foreground', className)
      },
      props
    ),
    render,
    state: {
      slot: 'breadcrumb-link'
    }
  })
}

export function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: ignore
    // biome-ignore lint/a11y/useSemanticElements: ignore
    <span
      aria-current='page'
      aria-disabled='true'
      className={cn('font-normal text-foreground', className)}
      data-slot='breadcrumb-page'
      role='link'
      {...props}
    />
  )
}

export function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      data-slot='breadcrumb-separator'
      role='presentation'
      {...props}
    >
      {children ?? <ChevronRightIcon className='cn-rtl-flip' />}
    </li>
  )
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden='true'
      className={cn('flex size-5 items-center justify-center [&>svg]:size-4', className)}
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      {...props}
    >
      <MoreHorizontalIcon />
      <span className='sr-only'>More</span>
    </span>
  )
}
