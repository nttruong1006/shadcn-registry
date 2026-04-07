import { QueryClientProvider } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { Suspense } from 'react'
import { queryClient } from '@/lib/tanstack-query'
import { Card, CardContent } from '@/registry/new-york/atoms/card/components/card'
import { cn } from '@/utils/ui'
import { getComponent, type ModuleProps } from './lib'

export function CodePreviewModule({ path, className, children }: ModuleProps) {
  const Component = getComponent(path)

  if (Component) {
    return (
      <QueryClientProvider client={queryClient}>
        <Card className={cn('not-content overflow-hidden p-0', className)}>
          <CardContent className='p-0'>
            <div className='border-b bg-background text-foreground'>
              <div className='component-container flex min-h-96 items-center justify-center p-8'>
                <Suspense fallback={<LoaderCircle className='mx-auto animate-spin' />}>
                  <Component />
                </Suspense>
              </div>
            </div>
            <div className='max-h-96 overflow-auto'>{children}</div>
          </CardContent>
        </Card>
      </QueryClientProvider>
    )
  }

  return null
}
