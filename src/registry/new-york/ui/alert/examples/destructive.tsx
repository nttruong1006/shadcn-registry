import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert'

// Component
export function AlertDestructive() {
  // Template
  return (
    <Alert className='max-w-md' variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  )
}
