import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Card
export const Card = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm', className)}
      data-slot='card'
      {...props}
    />
  )
}

// Card header
export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      data-slot='card-header'
      {...props}
    />
  )
}

// Card title
export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('font-semibold text-base', className)} data-slot='card-title' {...props} />
}

// Card description
export const CardDescription = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('text-muted-foreground text-sm', className)} data-slot='card-description' {...props} />
}

// Card action
export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return (
    <div
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      data-slot='card-action'
      {...props}
    />
  )
}

// Card content
export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('px-6', className)} data-slot='card-content' {...props} />
}

// Card footer
export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  // Template
  return <div className={cn('flex items-center px-6 [.border-t]:pt-6', className)} data-slot='card-footer' {...props} />
}
