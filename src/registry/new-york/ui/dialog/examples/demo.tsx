import { Button } from '@/registry/new-york/ui/button/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollableContent,
  DialogTitle,
  DialogTrigger
} from '@/registry/new-york/ui/dialog/components/dialog'
import { Input } from '@/registry/new-york/ui/input/components/input'
import { Label } from '@/registry/new-york/ui/label/components/label'

// Component
export const DialogDemo = () => {
  // Template
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline'>Open Dialog</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-xl'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>

          <DialogScrollableContent>
            <div className='grid gap-4'>
              <div className='grid gap-3'>
                <Label htmlFor='name-1'>Name</Label>
                <Input defaultValue='Pedro Duarte' id='name-1' name='name' />
              </div>
              <div className='grid gap-3'>
                <Label htmlFor='username-1'>Username</Label>
                <Input defaultValue='@peduarte' id='username-1' name='username' />
              </div>
            </div>
          </DialogScrollableContent>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
