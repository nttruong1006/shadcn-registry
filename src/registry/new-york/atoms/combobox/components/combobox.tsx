import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { type ComponentPropsWithRef, useRef } from 'react'
import { Button } from '@/components/atoms/button'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/atoms/input-group'
import { cn } from '@/utils/ui'

export const Combobox = ComboboxPrimitive.Root

export function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />
}

export function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      data-slot='combobox-trigger'
      {...props}
    >
      {children}
      <ChevronDownIcon className='pointer-events-none size-4 text-muted-foreground' />
    </ComboboxPrimitive.Trigger>
  )
}

export function ComboboxClear({ ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot='combobox-clear'
      render={
        <InputGroupButton size='icon-xs' variant='ghost'>
          <XIcon className='pointer-events-none' />
        </InputGroupButton>
      }
      {...props}
    />
  )
}

export function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn('w-auto', className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align='inline-end'>
        {showTrigger && (
          <InputGroupButton
            className='group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent'
            data-slot='input-group-button'
            disabled={disabled}
            render={<ComboboxTrigger />}
            size='icon-xs'
            variant='ghost'
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

export function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className='isolate z-50'
        side={side}
        sideOffset={sideOffset}
      >
        <ComboboxPrimitive.Popup
          className={cn(
            'cn-menu-target cn-menu-translucent group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+(--spacing(7)))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none',
            className
          )}
          data-chips={!!anchor}
          data-slot='combobox-content'
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        'no-scrollbar max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--available-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
        className
      )}
      data-slot='combobox-list'
      {...props}
    />
  )
}

function getComboboxItemTitle(value: ComboboxPrimitive.Item.Props['value']) {
  if (!value) {
    return null
  }

  switch (typeof value) {
    case 'string':
      return value
    case 'object':
      return value.label ?? null
    default:
      return null
  }
}

export function ComboboxItem({ className, children, value, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='combobox-item'
      title={getComboboxItemTitle(value)}
      value={value}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center'>
            <CheckIcon className='pointer-events-none' />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  )
}

export function ComboboxGroup(props: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot='combobox-group' {...props} />
}

export function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
      data-slot='combobox-label'
      {...props}
    />
  )
}

export function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot='combobox-collection' {...props} />
}

export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        'hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex',
        className
      )}
      data-slot='combobox-empty'
      {...props}
    />
  )
}

export function ComboboxStatus({ className, ...props }: ComboboxPrimitive.Status.Props) {
  return (
    <ComboboxPrimitive.Status
      className={cn('px-2.5 py-2 text-muted-foreground', className)}
      data-slot='combobox-status'
      {...props}
    />
  )
}

export function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      data-slot='combobox-separator'
      {...props}
    />
  )
}

export function ComboboxChips({
  className,
  ...props
}: ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.InputGroup>
      <ComboboxPrimitive.Chips
        className={cn(
          'flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-data-[slot=combobox-chip]:px-1.5 has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
          className
        )}
        data-slot='combobox-chips'
        {...props}
      />
    </ComboboxPrimitive.InputGroup>
  )
}

export function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      className={cn(
        'flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-sm bg-muted px-1.5 font-medium text-foreground text-xs has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:opacity-50',
        className
      )}
      data-slot='combobox-chip'
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className='-ml-1 text-muted-foreground hover:text-foreground'
          data-slot='combobox-chip-remove'
          render={
            <Button size='icon-xs' variant='ghost'>
              <XIcon className='pointer-events-none' />
            </Button>
          }
        />
      )}
    </ComboboxPrimitive.Chip>
  )
}

export function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      className={cn('min-w-16 flex-1 outline-none', className)}
      data-slot='combobox-chip-input'
      {...props}
    />
  )
}

export function useComboboxAnchor() {
  return useRef<HTMLDivElement | null>(null)
}
