import { type PropsWithChildren, Suspense } from 'react'
import { Spinner } from '@/registry/new-york/ui/spinner/components/spinner'

// Component
const FormContainer = ({ children }: PropsWithChildren) => {
  // Template
  return <Suspense fallback={<Spinner className='mx-auto size-6' />}>{children}</Suspense>
}

export default FormContainer
