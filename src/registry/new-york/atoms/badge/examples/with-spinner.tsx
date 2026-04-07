import { Badge } from '@/components/atoms/badge'
import { Spinner } from '@/components/atoms/spinner'

export function BadgeWithSpinner() {
  return (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='destructive'>
        <Spinner data-icon='inline-start' />
        Deleting
      </Badge>
      <Badge variant='secondary'>
        Generating
        <Spinner data-icon='inline-end' />
      </Badge>
    </div>
  )
}
