import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Table
export const Table = ({ className, ...props }: ComponentProps<'table'>) => {
  // Template
  return (
    <div className='size-full max-h-full grow overflow-auto' data-slot='table-container'>
      <table
        className={cn('w-full table-fixed caption-bottom border-separate border-spacing-0 text-sm', className)}
        data-slot='table'
        {...props}
      />
    </div>
  )
}

// Table header
export const TableHeader = ({ className, ...props }: ComponentProps<'thead'>) => {
  // Template
  return <thead className={cn('[&_tr]:border-b', className)} data-slot='table-header' {...props} />
}

// Table body
export const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => {
  // Template
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0 [&_tr]:hover:bg-muted/50', className)}
      data-slot='table-body'
      {...props}
    />
  )
}

// Table footer
export const TableFooter = ({ className, ...props }: ComponentProps<'tfoot'>) => {
  return (
    <tfoot
      className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      data-slot='table-footer'
      {...props}
    />
  )
}

// Table row
export const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => {
  // Template
  return (
    <tr
      className={cn('border-b transition-colors data-[state=selected]:bg-muted', className)}
      data-slot='table-row'
      {...props}
    />
  )
}

// Table head
export const TableHead = ({ className, ...props }: ComponentProps<'th'>) => {
  // Template
  return (
    <th
      className={cn(
        'whitespace-nowrap px-4 py-3 text-left align-middle font-semibold text-foreground [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      data-slot='table-head'
      {...props}
    />
  )
}

// Table cell
export const TableCell = ({ className, ...props }: ComponentProps<'td'>) => {
  // Template
  return (
    <td
      className={cn(
        'whitespace-nowrap px-4 py-3 align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      data-slot='table-cell'
      {...props}
    />
  )
}

// Table caption
export const TableCaption = ({ className, ...props }: ComponentProps<'caption'>) => {
  // Template
  return (
    <caption className={cn('mt-4 text-muted-foreground text-sm', className)} data-slot='table-caption' {...props} />
  )
}
