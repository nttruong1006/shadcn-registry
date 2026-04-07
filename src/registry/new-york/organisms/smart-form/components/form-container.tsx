import { type PropsWithChildren, Suspense } from 'react'
import { Spinner } from '@/components/atoms/spinner'

export default function FormContainer({ children }: PropsWithChildren) {
  return <Suspense fallback={<Spinner className='mx-auto size-6' />}>{children}</Suspense>
}
