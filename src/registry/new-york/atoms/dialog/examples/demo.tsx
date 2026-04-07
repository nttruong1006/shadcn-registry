import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'
import { Field, FieldGroup } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'

export function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant='outline'>Open Dialog</Button>} />
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor='name-1'>Name</Label>
              <Input defaultValue='Pedro Duarte' id='name-1' name='name' />
            </Field>
            <Field>
              <Label htmlFor='username-1'>Username</Label>
              <Input defaultValue='@peduarte' id='username-1' name='username' />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant='outline'>Cancel</Button>} />
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
