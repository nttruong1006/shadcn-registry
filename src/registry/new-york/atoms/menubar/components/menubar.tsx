import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { CheckIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/atoms/dropdown-menu'
import { cn } from '@/utils/ui'

export function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      className={cn('flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs', className)}
      data-slot='menubar'
      {...props}
    />
  )
}

export function MenubarMenu(props: ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot='menubar-menu' {...props} />
}

export function MenubarGroup(props: ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot='menubar-group' {...props} />
}

export function MenubarPortal(props: ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot='menubar-portal' {...props} />
}

export function MenubarTrigger({ className, ...props }: ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      className={cn(
        'flex select-none items-center rounded-sm px-2 py-1 font-medium text-sm outline-hidden hover:bg-muted aria-expanded:bg-muted',
        className
      )}
      data-slot='menubar-trigger'
      {...props}
    />
  )
}

export function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      className={cn(
        'cn-menu-target cn-menu-translucent data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 w-fit min-w-36 rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-open:animate-in',
        className
      )}
      data-slot='menubar-content'
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        "group/menubar-item gap-2 rounded-sm px-2 py-1.5 text-sm focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-disabled:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      data-inset={inset}
      data-slot='menubar-item'
      data-variant={variant}
      {...props}
    />
  )
}

export function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      )}
      data-inset={inset}
      data-slot='menubar-checkbox-item'
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

export function MenubarRadioGroup(props: ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot='menubar-radio-group' {...props} />
}

export function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none data-inset:pl-8 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-inset={inset}
      data-slot='menubar-radio-item'
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

export function MenubarLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuLabel
      className={cn('px-2 py-1.5 font-medium text-sm data-inset:pl-8', className)}
      data-inset={inset}
      data-slot='menubar-label'
      {...props}
    />
  )
}

export function MenubarSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      data-slot='menubar-separator'
      {...props}
    />
  )
}

export function MenubarShortcut({ className, ...props }: ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      className={cn(
        'ml-auto text-muted-foreground text-xs tracking-widest group-focus/menubar-item:text-accent-foreground',
        className
      )}
      data-slot='menubar-shortcut'
      {...props}
    />
  )
}

export function MenubarSub(props: ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot='menubar-sub' {...props} />
}

export function MenubarSubTrigger({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuSubTrigger
      className={cn(
        "gap-2 rounded-sm px-2 py-1.5 text-sm focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-inset:pl-8 data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-inset={inset}
      data-slot='menubar-sub-trigger'
      {...props}
    />
  )
}

export function MenubarSubContent({ className, ...props }: ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      className={cn(
        'cn-menu-target cn-menu-translucent data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 min-w-32 rounded-md bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in',
        className
      )}
      data-slot='menubar-sub-content'
      {...props}
    />
  )
}
