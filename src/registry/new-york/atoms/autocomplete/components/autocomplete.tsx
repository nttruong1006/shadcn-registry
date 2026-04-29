import { Autocomplete as AutocompletePrimitive } from '@base-ui/react'
import { XIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/atoms/input-group'
import { cn } from '@/utils/ui'

export const Autocomplete = AutocompletePrimitive.Root

export function AutocompleteValue({ ...props }: AutocompletePrimitive.Value.Props) {
  return <AutocompletePrimitive.Value data-slot='autocomplete-value' {...props} />
}

export function AutocompleteTrigger({ children, ...props }: AutocompletePrimitive.Trigger.Props) {
  return (
    <AutocompletePrimitive.Trigger data-slot='autocomplete-trigger' {...props}>
      {children}
    </AutocompletePrimitive.Trigger>
  )
}

export function AutocompleteClear({ ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot='autocomplete-clear'
      render={
        <InputGroupButton size='icon-xs' variant='ghost'>
          <XIcon className='pointer-events-none' />
        </InputGroupButton>
      }
      {...props}
    />
  )
}

export function AutocompleteInput({
  className,
  children,
  disabled = false,
  showClear = false,
  ...props
}: AutocompletePrimitive.Input.Props & {
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn('w-auto', className)}>
      <AutocompletePrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      {showClear && (
        <InputGroupAddon align='inline-end'>
          <AutocompleteClear disabled={disabled} />
        </InputGroupAddon>
      )}
      {children}
    </InputGroup>
  )
}

export function AutocompleteContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<AutocompletePrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className='isolate z-50'
        side={side}
        sideOffset={sideOffset}
      >
        <AutocompletePrimitive.Popup
          className={cn(
            'group/autocomplete-content data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-(--available-height) w-(--anchor-width) min-w-[calc(var(--anchor-width)+--spacing(7))] max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-closed:animate-out data-open:animate-in *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none',
            'data-empty:hidden',
            className
          )}
          data-chips={!!anchor}
          data-slot='autocomplete-content'
          {...props}
        />
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  )
}

export function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      className={cn(
        'no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0',
        className
      )}
      data-slot='combobox-list'
      {...props}
    />
  )
}

function getAutocompleteTitle(value: AutocompletePrimitive.Item.Props['value']) {
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

export function AutocompleteItem({ className, value, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50 not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      data-slot='autocomplete-item'
      title={getAutocompleteTitle(value)}
      value={value}
      {...props}
    />
  )
}

export function AutocompleteGroup({ ...props }: AutocompletePrimitive.Group.Props) {
  return <AutocompletePrimitive.Group data-slot='autocomplete-group' {...props} />
}

export function AutocompleteLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
      data-slot='autocomplete-label'
      {...props}
    />
  )
}

export function AutocompleteCollection({ ...props }: AutocompletePrimitive.Collection.Props) {
  return <AutocompletePrimitive.Collection data-slot='autocomplete-collection' {...props} />
}

export function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      className={cn(
        'hidden py-2 text-center text-muted-foreground text-sm group-data-empty/autocomplete-content:block',
        className
      )}
      data-slot='autocomplete-empty'
      {...props}
    />
  )
}

export function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      data-slot='autocomplete-separator'
      {...props}
    />
  )
}

export function AutocompleteStatus({ className, ...props }: AutocompletePrimitive.Status.Props) {
  return (
    <AutocompletePrimitive.Status className={cn('px-2.5 py-2', className)} data-slot='autocomplete-status' {...props} />
  )
}
