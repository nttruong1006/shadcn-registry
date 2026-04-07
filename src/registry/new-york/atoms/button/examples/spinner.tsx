import { Button } from '@/components/atoms/button'
import { Spinner } from '@/components/atoms/spinner'

export function ButtonLoading() {
  return (
    <div className='flex gap-2'>
      <Button disabled variant='outline'>
        <Spinner data-icon='inline-start' />
        Generating
      </Button>
      <Button disabled variant='secondary'>
        Downloading
        <Spinner data-icon='inline-end' />
      </Button>
    </div>
  )
}
