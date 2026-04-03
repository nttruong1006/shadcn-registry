import { CheckCircle2Icon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert'

// Component
export function AlertBasic() {
  // Template
  return (
    <Alert className='max-w-md'>
      <CheckCircle2Icon />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected immediately.
      </AlertDescription>
    </Alert>
  )
}
