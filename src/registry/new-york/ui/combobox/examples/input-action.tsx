import { PlusIcon } from 'lucide-react'
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
import { Input } from '@/registry/new-york/ui/input/components/input'
import { Label } from '@/registry/new-york/ui/label/components/label'
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
export function ComboboxInputAction() {
  // States
  const [value, setValue] = useState<ComboboxProps['value']>(null)

  // Template
  return (
    <div className='w-full max-w-xs'>
      <Combobox
        commandInputProps={{
          children: (
            <Dialog>
              <DialogTrigger asChild>
                <Button className='-mr-2' size='icon-sm' variant='ghost'>
                  <PlusIcon />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create new option</DialogTitle>
                  <DialogDescription>Fill all information below to create new option.</DialogDescription>
                </DialogHeader>

                <form className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>Value</Label>
                    <Input placeholder='Enter value' />
                  </div>

                  <div className='space-y-2'>
                    <Label>Label</Label>
                    <Input placeholder='Enter label' />
                  </div>
                </form>

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
          )
        }}
        onValueChange={setValue}
        options={options}
        placeholder='Select framework'
        value={value}
      />
    </div>
  )
}
