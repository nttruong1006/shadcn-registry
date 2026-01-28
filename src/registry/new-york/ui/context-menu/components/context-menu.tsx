import {
  CheckboxItem,
  Content,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger
} from '@radix-ui/react-context-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/utils/ui'

// Context menu
export const ContextMenu = ({ ...props }: ComponentProps<typeof Root>) => {
  // Template
  return <Root data-slot='context-menu' {...props} />
}

// Context menu trigger
export const ContextMenuTrigger = ({ ...props }: ComponentProps<typeof Trigger>) => {
  // Template
  return <Trigger data-slot='context-menu-trigger' {...props} />
}

// Context menu group
export const ContextMenuGroup = ({ ...props }: ComponentProps<typeof Group>) => {
  // Template
  return <Group data-slot='context-menu-group' {...props} />
}

// Context menu portal
export const ContextMenuPortal = ({ ...props }: ComponentProps<typeof Portal>) => {
  // Template
  return <Portal data-slot='context-menu-portal' {...props} />
}

// Context menu sub
export const ContextMenuSub = ({ ...props }: ComponentProps<typeof Sub>) => {
  // Template
  return <Sub data-slot='context-menu-sub' {...props} />
}

// Context menu radio group
export const ContextMenuRadioGroup = ({ ...props }: ComponentProps<typeof RadioGroup>) => {
  // Template
  return <RadioGroup data-slot='context-menu-radio-group' {...props} />
}

// Context menu sub trigger
export const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof SubTrigger> & {
  inset?: boolean
}) => {
  // Template
  return (
    <SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-inset:pl-8 data-[state=open]:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot='context-menu-sub-trigger'
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </SubTrigger>
  )
}

// Context menu sub content
export const ContextMenuSubContent = ({ className, ...props }: ComponentProps<typeof SubContent>) => {
  // Template
  return (
    <SubContent
      className={cn(
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in',
        className
      )}
      data-slot='context-menu-sub-content'
      {...props}
    />
  )
}

// Context menu content
export const ContextMenuContent = ({ className, ...props }: ComponentProps<typeof Content>) => {
  // Template
  return (
    <Portal>
      <Content
        className={cn(
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-32 origin-(--radix-context-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in',
          className
        )}
        data-slot='context-menu-content'
        {...props}
      />
    </Portal>
  )
}

// Context menu item
export const ContextMenuItem = ({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) => {
  // Template
  return (
    <Item
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      data-inset={inset}
      data-slot='context-menu-item'
      data-variant={variant}
      {...props}
    />
  )
}

// Context menu checkbox item
export const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ...props
}: ComponentProps<typeof CheckboxItem>) => {
  // Template
  return (
    <CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='context-menu-checkbox-item'
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ItemIndicator>
          <CheckIcon className='size-4' />
        </ItemIndicator>
      </span>
      {children}
    </CheckboxItem>
  )
}

// Context menu radio item
export const ContextMenuRadioItem = ({ className, children, ...props }: ComponentProps<typeof RadioItem>) => {
  // Template
  return (
    <RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='context-menu-radio-item'
      {...props}
    >
      <span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
        <ItemIndicator>
          <CircleIcon className='size-2 fill-current' />
        </ItemIndicator>
      </span>
      {children}
    </RadioItem>
  )
}

// Context menu label
export const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean
}) => {
  // Template
  return (
    <Label
      className={cn('px-2 py-1.5 font-medium text-foreground text-sm data-inset:pl-8', className)}
      data-inset={inset}
      data-slot='context-menu-label'
      {...props}
    />
  )
}

// Context menu separator
export const ContextMenuSeparator = ({ className, ...props }: ComponentProps<typeof Separator>) => {
  // Template
  return (
    <Separator className={cn('-mx-1 my-1 h-px bg-border', className)} data-slot='context-menu-separator' {...props} />
  )
}

// Context menu shortcut
export const ContextMenuShortcut = ({ className, ...props }: ComponentProps<'span'>) => {
  // Template
  return (
    <span
      className={cn('ml-auto text-muted-foreground text-xs tracking-widest', className)}
      data-slot='context-menu-shortcut'
      {...props}
    />
  )
}
