import type { PropsWithChildren } from 'react'
import { Spinner } from '@/components/atoms/spinner'
import { cn } from '@/utils/ui'

export function LoadingOverlay({
  className,
  loading,
  children
}: PropsWithChildren & {
  className?: string
  loading?: boolean
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      <div
        className={cn(
          'absolute top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-muted/60 transition-[visibility]',
          loading ? 'visible' : 'invisible'
        )}
      >
        <Spinner className='size-6' />
      </div>
    </div>
  )
}
