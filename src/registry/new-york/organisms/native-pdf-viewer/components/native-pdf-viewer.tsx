import { skipToken, useQuery } from '@tanstack/react-query'
import type { IframeHTMLAttributes } from 'react'
import { Spinner } from '@/components/atoms/spinner'
import { cn } from '@/utils/ui'

export function NativePDFViewer({ src, className, ...props }: IframeHTMLAttributes<HTMLIFrameElement>) {
  const getPdfQuery = useQuery({
    queryFn: src
      ? async () => {
          const response = await fetch(src)
          if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status}`)
          }
          return await response.blob()
        }
      : skipToken,
    queryKey: ['pdf', src],
    retry: 0
  })

  if (getPdfQuery.isFetching) {
    return <Spinner className='mx-auto size-6' />
  }

  if (getPdfQuery.isError) {
    return <div>Failed to display PDF</div>
  }

  return <iframe className={cn('w-full', className)} src={src} {...props} />
}
