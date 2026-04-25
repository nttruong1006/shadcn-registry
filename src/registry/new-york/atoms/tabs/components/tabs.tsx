import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from '@/utils/ui'

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} data-slot='tabs' {...props} />
}

export function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      className={cn(
        'relative z-0 flex h-9 w-fit items-center justify-center rounded-lg bg-muted/50 p-1 text-muted-foreground',
        className
      )}
      data-slot='tabs-list'
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator className='absolute top-1/2 left-0 z-[-1] h-6 w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded-md bg-muted transition-all' />
    </TabsPrimitive.List>
  )
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 font-medium text-muted-foreground text-sm transition-colors focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        'hover:text-foreground data-active:text-foreground data-active:hover:text-foreground',
        className
      )}
      data-slot='tabs-trigger'
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel className={cn('relative grow outline-none', className)} data-slot='tabs-content' {...props} />
  )
}
