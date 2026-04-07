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
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'

export function DialogCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant='outline'>Share</Button>} />
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <div className='flex items-center gap-2'>
          <div className='grid flex-1 gap-2'>
            <Label className='sr-only' htmlFor='link'>
              Link
            </Label>
            <Input defaultValue='https://ui.shadcn.com/docs/installation' id='link' readOnly />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose render={<Button type='button'>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
