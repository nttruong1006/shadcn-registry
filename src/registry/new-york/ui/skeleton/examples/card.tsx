import { Skeleton } from '@/registry/new-york/ui/skeleton/components/skeleton'

// Component
export const SkeletonCard = () => {
  // Template
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[250px]' />
      </div>
    </div>
  )
}
