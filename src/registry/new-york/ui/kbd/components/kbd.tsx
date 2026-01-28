import { cn } from '@/utils/ui'

// Kbd
export const Kbd = ({ className, ...props }: React.ComponentProps<'kbd'>) => {
  // Template
  return (
    <kbd
      className={cn(
        'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-muted-foreground text-xs',
        "[&_svg:not([class*='size-'])]:size-3",
        'in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10',
        className
      )}
      data-slot='kbd'
      {...props}
    />
  )
}

// Kbd group
export const KbdGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  // Template
  return <kbd className={cn('inline-flex items-center gap-1', className)} data-slot='kbd-group' {...props} />
}
