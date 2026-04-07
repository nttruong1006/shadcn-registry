import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'

export function DialogNoCloseButton() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant='outline'>No Close Button</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>This dialog doesn&apos;t have a close button in the top-right corner.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
