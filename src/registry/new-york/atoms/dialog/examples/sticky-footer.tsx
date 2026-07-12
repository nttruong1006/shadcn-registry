import { Button } from '@/components/atoms/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScroller,
  DialogTitle,
  DialogTrigger
} from '@/components/atoms/dialog'

export function DialogStickyFooter() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant='outline'>Sticky Footer</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content scrolls.
          </DialogDescription>
        </DialogHeader>

        <DialogScroller>
          {Array.from({ length: 20 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: ignore
            <p className='leading-normal' key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          ))}
        </DialogScroller>
        <DialogFooter>
          <DialogClose render={<Button variant='outline'>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
