import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/registry/new-york/ui/dialog/components/dialog'
import type { Option } from '@/types/base'

// Constants
const options: Option[] = [
  {
    value: 'next.js',
    label: 'Next.js'
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit'
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    value: 'remix',
    label: 'Remix'
  },
  {
    value: 'astro',
    label: 'Astro'
  }
]

// Component
export function ComboboxCommandInputAction() {
  // States
  const [value, setValue] = useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        commandItemPrefix={(option) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button className='size-6 shrink-0' size='icon-sm' variant='ghost'>
                <TrashIcon />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete option {option.label}</DialogTitle>
                <DialogDescription>
                  This action can not be undone. Are you sure that you want to delete this option.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button>Submit</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        onValueChange={setValue}
        options={options}
        placeholder='Select framework'
        value={value}
      />
    </div>
  )
}
