import { Command as CommandPrimitive } from 'cmdk'
import { CheckIcon, SearchIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/atoms/dialog'
import { InputGroup, InputGroupAddon } from '@/components/atoms/input-group'
import { cn } from '@/utils/ui'

export function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        'flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground',
        className
      )}
      data-slot='command'
      {...props}
    />
  )
}

export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<ComponentProps<typeof Dialog>, 'children'> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0', className)}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className='p-1 pb-0' data-slot='command-input-wrapper'>
      <InputGroup className='h-8! rounded-lg! border-input/30 shadow-none! has-[[data-slot=command-input]:focus-visible]:border-ring has-[[data-slot=command-input]:focus-visible]:ring-3 has-[[data-slot=command-input]:focus-visible]:ring-ring/50 *:data-[slot=input-group-addon]:pl-2!'>
        <CommandPrimitive.Input
          className={cn('w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50', className)}
          data-slot='command-input'
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className='size-4 shrink-0 opacity-50' />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn('no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overflow-x-hidden outline-none', className)}
      data-slot='command-list'
      {...props}
    />
  )
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cn('py-6 text-center text-sm', className)}
      data-slot='command-empty'
      {...props}
    />
  )
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        'overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group-heading]]:text-xs',
        className
      )}
      data-slot='command-group'
      {...props}
    />
  )
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-1 h-px w-auto bg-border', className)}
      data-slot='command-separator'
      {...props}
    />
  )
}

export function CommandItem({ className, children, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "group/command-item relative flex cursor-default select-none items-center gap-2 in-data-[slot=dialog-content]:rounded-lg! rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-selected:bg-muted data-selected:text-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 data-selected:**:[svg]:text-foreground",
        className
      )}
      data-slot='command-item'
      {...props}
    >
      {children}
      <CheckIcon className='ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100' />
    </CommandPrimitive.Item>
  )
}

export function CommandShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'ml-auto text-muted-foreground text-xs tracking-widest group-data-selected/command-item:text-foreground',
        className
      )}
      data-slot='command-shortcut'
      {...props}
    />
  )
}
