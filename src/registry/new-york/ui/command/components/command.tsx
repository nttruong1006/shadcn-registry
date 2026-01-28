import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/registry/new-york/ui/dialog/components/dialog'
import { cn } from '@/utils/ui'

// Command
export type CommandProps = ComponentProps<typeof CommandPrimitive>
export const Command = ({ className, ...props }: CommandProps) => {
  // Template
  return (
    <CommandPrimitive
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      data-slot='command'
      {...props}
    />
  )
}

// Command dialog
export const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) => {
  // Template
  return (
    <Dialog {...props}>
      <DialogHeader className='sr-only'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className={cn('overflow-hidden p-0', className)} showCloseButton={showCloseButton}>
        <Command className='**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]]:px-2 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

// Command input
export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>
export const CommandInput = ({ className, children, ...props }: CommandInputProps) => {
  // Template
  return (
    <div className='flex h-9 items-center gap-2 border-b px-3' data-slot='command-input-wrapper'>
      <SearchIcon className='size-4 shrink-0 text-muted-foreground' />
      <CommandPrimitive.Input
        className={cn(
          'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        data-slot='command-input'
        {...props}
      />
      {children}
    </div>
  )
}

// Command list
export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>
export const CommandList = ({ className, ...props }: CommandListProps) => {
  // Template
  return (
    <CommandPrimitive.List
      className={cn('max-h-80 scroll-py-1 overflow-y-auto overflow-x-hidden', className)}
      data-slot='command-list'
      {...props}
    />
  )
}

// Command empty
export const CommandEmpty = ({ ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => {
  // Template
  return <CommandPrimitive.Empty className='py-6 text-center text-sm' data-slot='command-empty' {...props} />
}

// Command group
export const CommandGroup = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) => {
  // Template
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

// Command separator
export const CommandSeparator = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) => {
  // Template
  return (
    <CommandPrimitive.Separator
      className={cn('-mx-1 h-px bg-border', className)}
      data-slot='command-separator'
      {...props}
    />
  )
}

// Command item
export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>
export const CommandItem = ({ className, ...props }: CommandItemProps) => {
  // Template
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='command-item'
      {...props}
    />
  )
}

export const CommandShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  // Template
  return (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='command-shortcut'
      {...props}
    />
  )
}
