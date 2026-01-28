import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'

// Component
export const SpinnerSize = () => {
  // Template
  return (
    <div className='flex items-center gap-6'>
      <Spinner className='size-4' />
      <Spinner className='size-6' />
      <Spinner className='size-8' />
    </div>
  )
}
