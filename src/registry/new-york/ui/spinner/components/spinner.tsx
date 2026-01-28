import { Loader2Icon } from 'lucide-react'
import { cn } from '@/utils/ui'

// Spinner
export const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  // Template
  return <Loader2Icon aria-label='Loading' className={cn('size-4 animate-spin', className)} role='status' {...props} />
}
