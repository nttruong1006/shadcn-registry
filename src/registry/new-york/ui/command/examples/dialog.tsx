import { CalculatorIcon, CalendarIcon, CreditCardIcon, SettingsIcon, SmileIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/registry/new-york/ui/command/components/command'

// Component
export const CommandDialogDemo = () => {
  // States
  const [open, setOpen] = useState(false)

  // Effects
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Template
  return (
    <>
      <p className='text-muted-foreground text-sm'>
        Press{' '}
        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>J
        </kbd>
      </p>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>
              <CalendarIcon />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <SmileIcon />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <CalculatorIcon />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>
              <UserIcon />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCardIcon />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <SettingsIcon />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
